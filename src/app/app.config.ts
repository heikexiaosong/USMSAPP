export class AppConfig{

  public static  T_PUR_Receive = [];
  public static  T_SAL_DELIVERYNOTICE = [];

  public static url = "http://localhost:9080/usms";

  //生产环境url
  public  static  getProUrl(){
    return  AppConfig.url + "/";
  }

  //接口数据
  public  static  appUrl(){
    return AppConfig.url;
  }
}
