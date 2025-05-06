import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { Toolset } from "../toolset.js";
import { request } from "../util.js";

export class ToolsetDirectory implements Toolset {

    public register(server: McpServer): void {

        server.tool(
            "pingcode_get_current_team",
            "当需要获取PingCode当前团队信息的时候，调用此工具。",
            {},
            async () => {
                return request({
                    method: "GET",
                    path: "directory/team"
                });
            }
        );

        server.tool(
            "pingcode_get_current_user",
            "当需要获取PingCode当前登录用户信息的时候，调用此工具。",
            {},
            async () => {
                return request({
                    method: "GET",
                    path: "myself"
                });
            }
        );

        server.tool(
            "pingcode_get_team_members",
            "当需要获取企业成员列表，或者需要通过姓名查询某个成员ID的时候，调用此工具。",
            {
                "keywords": z.string({
                    description: "关键词模糊搜索，支持姓名、用户名"
                }).optional(),
                "department_ids": z.string({
                    description: "企业成员的部门id，使用','分割，最多只能20个"
                }).optional()
            },
            async args => {
                const params: Record<string, string> = {};
                if (args.keywords) params.keywords = args.keywords;
                if (args.department_ids) params.department_ids = args.department_ids;
                return request({
                    method: "GET",
                    path: "directory/users",
                    params: params
                });
            }
        );
    }

}