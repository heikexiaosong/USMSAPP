export class AppConfig{
  //测试环境url
  public  static getDebugUrl(){
    return "http://118.31.239.85:8001/";
  }
  //生产环境url
  public  static  getProUrl(){
    return "http://192.168.1.114:9080/cloud/";
  }
  //本地mock
  public  static  getMockUrl(){
    return "assets/data/";
  }
  //接口数据
  public  static  appUrl(){
    return "http://192.168.30.224:9080/cloud";
  }
}
