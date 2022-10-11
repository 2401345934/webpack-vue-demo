module.exports = {
  types: [
    {
      value: 'feat',
      name: '未开发完成:  暂存'
    },
    {
      value: 'feat',
      name: '特性:  新增功能'
    },
    {
      value: 'fix',
      name: '修复:  修复Bug'
    },
    {
      value: 'docs',
      name: '文档:  文档变更（如：README、CHANGELOG等）'
    },
    {
      value: 'style',
      name: '格式:  代码格式修正（不影响功能，如：空格、缩进、分号等）'
    },
    {
      value: 'refactor',
      name: '重构:  代码重构（既不是新增功能，也不是修复Bug的代码变动）'
    },
    {
      value: 'perf',
      name: '性能:  性能优化（如：提升性能、体验、算法等）'
    },
    {
      value: 'test',
      name: '测试:  添加或修改测试用例（包括单元测试、集成测试等）'
    },
    {
      value: 'build',
      name: '构建:  变更项目构建或外部依赖（如scopes: webpack、gulp、npm等）'
    },
    {
      value: 'ci',
      name: '集成:  更改持续集成软件的配置文件和package中的scripts命令（如scopes: Travis, Circle等）'
    },
    {
      value: 'chore',
      name: '工具:  变更构建流程或增加依赖库、辅助工具（如：构建、脚手架工具等）'
    },
    {
      value: 'revert',
      name: '回滚:  代码回退到上一个版本'
    },
    {
      value: 'release',
      name: '发布:  发布版本提交'
    },
    {
      value: 'merge',
      name: '合并:  代码合并'
    },
    {
      value: 'workflow',
      name: '工作流: 工作流相关文件修改'
    }
  ],

  scopes: [
    ['config', '环境配置相关'],
    ['deps', '项目依赖'],
    ['api', '接口相关'],
    ['images', '图片相关'],
    ['styles', '样式相关'],
    ['components', '功能组件相关'],
    ['constants', '常量相关'],
    ['filters', '过滤器相关'],
    ['mappers', '匹配器相关'],
    ['mixins', '全局可复用功能相关'],
    ['modules', '业务组件相关'],
    ['pages', '页面相关'],
    ['trackers', '埋点相关'],
    ['utils', 'utils 相关'],
    ['hooks', 'hook 相关'],
    ['auth', '对 auth 修改'],
    ['other', '其他修改'],
    // 如果选择 custom，后面会让你再输入一个自定义的 scope。也可以不设置此项，把后面的 allowCustomScopes 设置为 true
    ['custom', '以上都不是？我要自定义']
  ].map(([value, description]) => {
    return {
      value,
      name: `${value.padEnd(30)} (${description})`
    }
  }),
  messages: {
    type: '选择你要提交的类型：',
    scope: '选择影响的范围 (可选)：',
    customScope: '请输入自定义的 scope：',
    subject: '填写简短精炼的变更描述：\n',
    body: '填写更加详细的变更描述（可选）。使用 "|" 换行：\n',
    breaking: '列举非兼容性重大的变更（可选）：\n',
    footer: '列举出所有变更的 ISSUES CLOSED（可选）。 例如: #31, #34：\n',
    confirmCommit: '确认提交？'
  },
  allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ['body', 'footer']
}
