class userService {
  async create(user) {
    // 将user存储到数据库中
    return "创建用户成功~";
  }
}

module.exports = new userService();
