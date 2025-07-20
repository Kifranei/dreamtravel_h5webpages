## 使用 HTML5 + CSS3 + Bootstrap5 实现的旅行网站

### 如需要连接后端请自行创建数据库表并改造动态网站

```
-- 检查数据库是否存在，如果不存在则创建
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'dream_travel_db')
BEGIN
    CREATE DATABASE dream_travel_db;
END
GO

USE dream_travel_db;
GO

-- --------------------------------------------------------

--
-- 表的结构 `t_user` (用户信息表)
--
IF OBJECT_ID('dbo.t_user', 'U') IS NOT NULL
    DROP TABLE dbo.t_user;
GO

CREATE TABLE [t_user] (
  [id] BIGINT IDENTITY(1,1) NOT NULL,
  [name] NVARCHAR(100) NOT NULL,
  [phone] VARCHAR(20) NOT NULL,
  [email] VARCHAR(100) NULL,
  [password] VARCHAR(100) NOT NULL,
  [create_time] DATETIME NOT NULL DEFAULT GETDATE(),
  PRIMARY KEY ([id]),
  UNIQUE ([phone])
);
GO

-- --------------------------------------------------------

--
-- 表的结构 `t_destination` (旅游目的地表)
--
IF OBJECT_ID('dbo.t_destination', 'U') IS NOT NULL
    DROP TABLE dbo.t_destination;
GO

CREATE TABLE [t_destination] (
    [id] BIGINT IDENTITY(1,1) NOT NULL,
    [name] NVARCHAR(100) NOT NULL,
    [continent] NVARCHAR(50) NULL, -- 所属大洲 (如: 亚洲, 欧洲)
    [country] NVARCHAR(50) NULL, -- 所属国家
    [description] NTEXT NULL, -- 目的地详细介绍
    [cover_image_url] VARCHAR(255) NULL,
    PRIMARY KEY ([id])
);
GO

-- --------------------------------------------------------

--
-- 表的结构 `t_tour` (旅游套餐表)
--
IF OBJECT_ID('dbo.t_tour', 'U') IS NOT NULL
    DROP TABLE dbo.t_tour;
GO

CREATE TABLE [t_tour] (
  [id] BIGINT IDENTITY(1,1) NOT NULL,
  [title] NVARCHAR(200) NOT NULL,
  [destination_id] BIGINT NOT NULL,
  [duration] NVARCHAR(50) NULL, -- 行程时长 (如: 7天6夜)
  [description] NTEXT NULL, -- 行程描述/亮点
  [base_price] DECIMAL(10,2) NOT NULL,
  [tour_type] NVARCHAR(50) NULL, -- 套餐类型 (如: 蜜月游, 家庭游)
  [cover_image_url] VARCHAR(255) NULL,
  PRIMARY KEY ([id]),
  CONSTRAINT [fk_tour_destination] FOREIGN KEY ([destination_id]) REFERENCES [t_destination] ([id])
);
GO

-- --------------------------------------------------------

--
-- 表的结构 `t_hotel` (酒店信息表)
--
IF OBJECT_ID('dbo.t_hotel', 'U') IS NOT NULL
    DROP TABLE dbo.t_hotel;
GO

CREATE TABLE [t_hotel] (
  [id] BIGINT IDENTITY(1,1) NOT NULL,
  [name] NVARCHAR(100) NOT NULL,
  [destination_id] BIGINT NOT NULL,
  [address] NVARCHAR(255) NULL,
  [star_rating] INT NULL, -- 星级 (1-5)
  [description] NTEXT NULL,
  [base_price] DECIMAL(10,2) NULL,
  PRIMARY KEY ([id]),
  CONSTRAINT [fk_hotel_destination] FOREIGN KEY ([destination_id]) REFERENCES [t_destination] ([id])
);
GO

-- --------------------------------------------------------

--
-- 表的结构 `t_booking_order` (订单表)
--
IF OBJECT_ID('dbo.t_booking_order', 'U') IS NOT NULL
    DROP TABLE dbo.t_booking_order;
GO

CREATE TABLE [t_booking_order] (
  [id] BIGINT IDENTITY(1,1) NOT NULL,
  [user_id] BIGINT NOT NULL,
  [product_id] BIGINT NOT NULL,
  [product_type] VARCHAR(20) NOT NULL, -- 产品类型 (tour/hotel)
  [departure_date] DATE NULL,
  [guest_count] INT NOT NULL,
  [total_price] DECIMAL(10,2) NOT NULL,
  [status] NVARCHAR(20) NOT NULL DEFAULT '待支付', -- 订单状态 (待支付/已支付/已完成/已取消)
  [create_time] DATETIME NOT NULL DEFAULT GETDATE(),
  PRIMARY KEY ([id]),
  CONSTRAINT [fk_order_user] FOREIGN KEY ([user_id]) REFERENCES [t_user] ([id])
);
GO

-- --------------------------------------------------------

--
-- 表的结构 `t_guest` (游客信息表)
--
IF OBJECT_ID('dbo.t_guest', 'U') IS NOT NULL
    DROP TABLE dbo.t_guest;
GO

CREATE TABLE [t_guest] (
  [id] BIGINT IDENTITY(1,1) NOT NULL,
  [order_id] BIGINT NOT NULL,
  [name] NVARCHAR(100) NOT NULL,
  [id_card_no] VARCHAR(50) NOT NULL,
  [is_contact] TINYINT NOT NULL DEFAULT 0, -- 是否为主要联系人(0:否, 1:是)
  PRIMARY KEY ([id]),
  CONSTRAINT [fk_guest_order] FOREIGN KEY ([order_id]) REFERENCES [t_booking_order] ([id])
);
GO

-- --------------------------------------------------------

--
-- 表的结构 `t_review` (客户评价表)
--
IF OBJECT_ID('dbo.t_review', 'U') IS NOT NULL
    DROP TABLE dbo.t_review;
GO

CREATE TABLE [t_review] (
    [id] BIGINT IDENTITY(1,1) NOT NULL,
    [user_id] BIGINT NOT NULL,
    [product_id] BIGINT NOT NULL,
    [product_type] VARCHAR(20) NOT NULL, -- 产品类型 (tour/hotel)
    [rating] INT NOT NULL, -- 评分 (1-5)
    [comment] NTEXT NULL,
    [create_time] DATETIME NOT NULL DEFAULT GETDATE(),
    PRIMARY KEY ([id]),
    CONSTRAINT [fk_review_user] FOREIGN KEY ([user_id]) REFERENCES [t_user] ([id])
);
GO

-- --------------------------------------------------------

--
-- 表的结构 `t_contact_message` (咨询信息表)
--
IF OBJECT_ID('dbo.t_contact_message', 'U') IS NOT NULL
    DROP TABLE dbo.t_contact_message;
GO

CREATE TABLE [t_contact_message] (
  [id] BIGINT IDENTITY(1,1) NOT NULL,
  [name] NVARCHAR(100) NOT NULL,
  [phone] VARCHAR(20) NOT NULL,
  [email] VARCHAR(100) NOT NULL,
  [message_type] NVARCHAR(50) NULL,
  [content] NTEXT NOT NULL,
  [create_time] DATETIME NOT NULL DEFAULT GETDATE(),
  PRIMARY KEY ([id])
);
GO
```
### 图片大部分来自互联网，禁止商用  仅供学习使用  请git clone后于24小时内删除/替换自己的图片

#### 使用 Github Copilot Pro（包括 GPT-4.1，GPT-4o,Claude 4 Sonet等模型）分别修改完善本项目，因此本项目开源任何人皆可使用
