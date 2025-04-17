import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { Toolset } from "../../toolset";
import { request } from "../../util";

export class ToolsetProjectWorkitem implements Toolset {

    public register(server: McpServer): void {

        server.tool(
            "pingcode_get_workitem_types",
            "当需要获取工作项类型列表的时候，或者需要通过类型名字查询某个类型ID的时候，调用此工具。",
            {
                "project_id": z.string({
                    description: "项目的id"
                })
            },
            async args => {
                return request({
                    method: "GET",
                    path: `project/work_item/types?project_id=${args.project_id}`
                });
            }
        );

        server.tool(
            "pingcode_get_workitem_states",
            "当需要获取工作项状态列表的时候，或者需要通过状态名字查询某个状态ID的时候，调用此工具。",
            {
                "project_id": z.string({
                    description: "项目的id"
                }),
                "work_item_type_id": z.string({
                    description: "工作项类型的id。工作项类型分为9种系统类型和一些自定义类型。系统类型包括：史诗、特性、用户故事、阶段、里程碑、需求、任务、缺陷和事务。"
                })
            },
            async args => {
                return request({
                    method: "GET",
                    path: `project/work_item/states?project_id=${args.project_id}&work_item_type_id=${args.work_item_type_id}`
                });
            }
        );

        server.tool(
            "pingcode_get_workitem",
            "当需要获取工作项详细信息的时候，调用此工具。",
            {
                "workitem_ID": z.string({
                    description: "工作项 ID"
                }),
                "fields": z.string({
                    description: "需要返回的字段，多个字段用逗号分隔"
                }).optional()
            },
            async args => {
                const params: Record<string, string> = {};
                if (args.fields) params.fields = args.fields;
                return request({
                    method: "GET",
                    path: `project/work_items/${args.workitem_ID}`, params
                });
            }
        );

        server.tool(
            "pingcode_get_workitems",
            "当需要获取工作项列表的时候，调用此工具。",
            {
                "identifier": z.string({
                    description: "工作项编号"
                }).optional(),
                "project_ids": z.string({
                    description: "项目的id，使用','分割，最多只能20个"
                }).optional(),
                "type_ids": z.string({
                    description: "工作项类型的id，使用','分割，最多只能20个"
                }).optional(),
                "parent_ids": z.string({
                    description: "父工作项的id，使用','分割，最多只能20个"
                }).optional(),
                "assignee_ids": z.string({
                    description: "工作项负责人的id，使用','分割，最多只能20个"
                }).optional(),
                "state_ids": z.string({
                    description: "工作项状态的id，使用','分割，最多只能20个"
                }).optional(),
                "start_between": z.string({
                    description: "开始时间介于的时间范围，通过','分割起始时间"
                }).optional(),
                "end_between": z.string({
                    description: "结束时间介于的时间范围，通过','分割起始时间"
                }).optional(),
                "priority_ids": z.string({
                    description: "工作项优先级的id，使用','分割，最多只能20个"
                }).optional(),
                "bug_type_ids": z.string({
                    description: "缺陷类别的id，使用','分割，最多只能20个"
                }).optional(),
                "tag_ids": z.string({
                    description: "工作项标签的id，使用','分割，最多只能20个"
                }).optional(),
                "sprint_ids": z.string({
                    description: "迭代的id，使用','分割，最多只能20个"
                }).optional(),
                "board_ids": z.string({
                    description: "看板的id，使用','分割，最多只能20个"
                }).optional(),
                "entry_ids": z.string({
                    description: "看板栏的id，使用','分割，最多只能20个"
                }).optional(),
                "swimlane_ids": z.string({
                    description: "泳道的id，使用','分割，最多只能20个"
                }).optional(),
                "phase_ids": z.string({
                    description: "所属计划的id，使用','分割，最多只能20个"
                }).optional(),
                "version_ids": z.string({
                    description: "发布的id，使用','分割，最多只能20个"
                }).optional(),
                "created_by_ids": z.string({
                    description: "创建人的id，使用','分割，最多只能20个"
                }).optional(),
                "created_between": z.string({
                    description: "创建时间介于的时间范围，通过','分割起始时间"
                }).optional(),
                "updated_between": z.string({
                    description: "更新时间介于的时间范围，通过','分割起始时间"
                }).optional(),
                "participant_id": z.string({
                    description: "工作项关注人的id"
                }).optional(),
                "keywords": z.string({
                    description: "关键字，支持工作项编号和工作项标题"
                }).optional(),
                "include_deleted": z.boolean({
                    description: "是否查询已删除的工作项，默认为false"
                }).optional(),
                "include_archived": z.boolean({
                    description: "是否查询已归档的工作项，默认为false"
                }).optional()
            },
            async args => {
                const params: Record<string, string> = {};
                if (args.identifier) params.identifier = args.identifier;
                if (args.project_ids) params.project_ids = args.project_ids;
                if (args.type_ids) params.type_ids = args.type_ids;
                if (args.parent_ids) params.parent_ids = args.parent_ids;
                if (args.assignee_ids) params.assignee_ids = args.assignee_ids;
                if (args.state_ids) params.state_ids = args.state_ids;
                if (args.start_between) params.start_between = args.start_between;
                if (args.end_between) params.end_between = args.end_between;
                if (args.priority_ids) params.priority_ids = args.priority_ids;
                if (args.bug_type_ids) params.bug_type_ids = args.bug_type_ids;
                if (args.tag_ids) params.tag_ids = args.tag_ids;
                if (args.sprint_ids) params.sprint_ids = args.sprint_ids;
                if (args.board_ids) params.board_ids = args.board_ids;
                if (args.entry_ids) params.entry_ids = args.entry_ids;
                if (args.swimlane_ids) params.swimlane_ids = args.swimlane_ids;
                if (args.phase_ids) params.phase_ids = args.phase_ids;
                if (args.version_ids) params.version_ids = args.version_ids;
                if (args.created_by_ids) params.created_by_ids = args.created_by_ids;
                if (args.created_between) params.created_between = args.created_between;
                if (args.updated_between) params.updated_between = args.updated_between;
                if (args.participant_id) params.participant_id = args.participant_id;
                if (args.keywords) params.keywords = args.keywords;
                if (args.include_deleted !== undefined) params.include_deleted = args.include_deleted.toString();
                if (args.include_archived !== undefined) params.include_archived = args.include_archived.toString();
                return request({
                    method: "GET",
                    path: "project/work_items", params
                });
            }
        );
    }

}