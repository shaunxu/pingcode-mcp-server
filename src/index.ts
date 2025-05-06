#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ToolsetDirectory, ToolsetProjectWorkitem } from "./toolsets/index.js";

const server = new McpServer({
    name: "pingcode-mcp-server",
    version: "1.0.0"
}, {
    capabilities: {
        tools: {}
    }
});

[
    new ToolsetDirectory(),
    new ToolsetProjectWorkitem(),
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