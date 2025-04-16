import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export interface Toolset {

    register(server: McpServer): void;

}