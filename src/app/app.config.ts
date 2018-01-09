export class AppConfig{
  //测试环境url
  public  static getDebugUrl(){
    return "http://118.31.239.85:8001/";
  }
  //生产环境url
  public  static  getProUrl(){
    return "";
  }
  //接口数据
  public  static  appUrl(){
    return "http://localhost:9080/cloud";
  }
}
