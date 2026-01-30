# TECH.md — Sound Mound Learning System

## 1. 系统架构
- Student App（行为采集）
- Backend（事件存储 + 规则分析）
- Teacher Dashboard（诊断展示）

## 2. 核心技术原则
- 前端不做教学判断
- 所有学生行为必须事件化
- 数据可回放

## 3. 关键组件
### Frontend
- AudioPlayer
- ChoiceGrid
- MappingDragBoard

### Backend
- Event Store
- Rule Analysis Engine v0

## 4. 核心数据模型
```json
{
  "event_type": "mapping_attempt",
  "phoneme": "/ā/",
  "pattern": "ai",
  "timestamp": 123
}
```

## 5. 技术选型（建议）
- Frontend: React / Flutter
- Backend: Node / Python
- Storage: Event-based DB

## 6. 技术成功标准
- 无学生行为数据丢失
- 教师端可解释学生规则问题
