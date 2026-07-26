declare const checkagentlimit: (agent: string, id: string) => Promise<{
    success: boolean;
    message: string;
}>;
export { checkagentlimit };
