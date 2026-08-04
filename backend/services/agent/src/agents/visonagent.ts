// adjust path to your actual shared cloudinary export
 // adjust to your actual state type import

import { cloudinary } from "@gothalo/shared";
import type { Statetype } from "./state.js";
import { getllm } from "./getllm.js";
import { checkagentlimit } from "../utils/limits.js";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));



/**
 * Fetches a single image from Pollinations.ai for a given prompt/seed.
 * Retries on 429 (rate limit) with increasing backoff.
 */
const fetchPollinationsImage = async (
  prompt: string,
  seed: number,
  retries = 3
): Promise<Buffer> => {
  const imageurl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?seed=${seed}`;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const imageResp = await fetch(imageurl);

    if (imageResp.ok) {
      const arrayBuffer = await imageResp.arrayBuffer();
      return Buffer.from(arrayBuffer);
    }

    if (imageResp.status === 429 && attempt < retries) {
      const backoff = 1500 * (attempt + 1); // 1.5s, 3s, 4.5s
      console.log(
        `Seed ${seed} rate limited, retrying in ${backoff}ms (attempt ${attempt + 1}/${retries})`
      );
      await sleep(backoff);
      continue;
    }

    throw new Error(`Pollinations request failed (seed ${seed}): ${imageResp.status}`);
  }

  throw new Error(`Pollinations request failed (seed ${seed}): exhausted retries`);
};

/**
 * Uploads a Buffer directly to Cloudinary via upload_stream.
 * No remote fetch happens on Cloudinary's side, avoiding the 403
 * caused by Cloudinary's fetcher being blocked by the source.
 */
const uploadBufferToCloudinary = (buffer: Buffer): Promise<any> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error:any, result:any) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
};

const visionagent = async (state: Statetype) => {

  const l= await checkagentlimit(state.agent,state.id)
  if(!l.success){
    return{
      ...state,
      limit:l
    }
  }
  try {
    const llm = getllm("image");

    const res = await llm.invoke(
      `
You are an elite AI image prompt engineer.
Convert the user request into a highly detailed image generation prompt.

Requirements:

Cinematic lighting
Professional composition
Ultra realistic
High detail
Beautiful color palette
Sharp focus
8K quality
Photorealistic
Depth of field
Professional photography
Stunning visuals

Return only the image prompt.

User Request:${state.prompt}
    `
    );

    const prompt = res.content as string;

    // Sequential with a small delay between requests to avoid Pollinations 429s
    const images: string[] = [];
    const errors: string[] = [];

    for (let i = 0; i < 4; i++) {
      try {
        const buffer = await fetchPollinationsImage(prompt, i + 1);
        const uploaded = await uploadBufferToCloudinary(buffer);
        images.push(uploaded.secure_url as string);
      } catch (err: any) {
        errors.push(err?.message ?? String(err));
      }

      // small gap between requests even on success, to stay under rate limits
      if (i < 3) await sleep(800);
    }

    if (errors.length > 0) {
      console.log(`${errors.length}/4 image generations failed:`, errors);
    }

    if (images.length === 0) {
      throw new Error("All image generations failed");
    }

    console.log("images", images);

    return {
      ...state,
      airesponse:"Image generated successfully.",


      images,
    };
  } catch (error: any) {
    console.log(error);
    return {
      ...state,
      images: [],
      error: error?.message ?? "Image generation failed",
    };
  }
};

export { visionagent };