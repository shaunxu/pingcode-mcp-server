import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Directory } from "./toolsets";

const server = new McpServer({
    name: "pingcode-mcp-server",
    version: "1.0.0"
}, {
    capabilities: {
        tools: {}
    }
});

[
    new Directory()
].forEach(x => x.register(server));

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);

    // since we use "stdio transport", we must use "console.error" to print messages
    console.error("PingCode MCP Server is running");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});