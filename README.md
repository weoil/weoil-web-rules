`某些`网站的视频解析

---

1. javdoe
2. javfinder
3. eporner
4. 91porn
5. kaplog
6. porn
7. pornhb
8. pornhub
9. redtube
10. sis001 //小说
11. streamjav
12. xhamster
13. youjizz

---

```
npm i weoil-web-rule
```

```
import rule from 'weoil-web-rule'

rule(url)//只传入网址会自动请求并进行合适的编码
rule(url,options)//同上,增加配置参数
rule(url,content,options)//传入网页内容和配置参数
options={
    proxy:"http://127.0.0.1:1080",//默认为 ""
    ruleName:""//指定名称,不然会进行依次遍历根据url进行匹配 默认为 ""
}
//返回值为
{
    status:boolean,//true成功,false失败
    message:"",//提示信息,
    data:object //解析后的内容
}
```

- 某些网站的视频在解析的时候有进行多次的请求密匙,所以如果本地网络访问不通时,需要声明 proxy
- 自动解析编码会优先使用 utf8,查找网页 charset 之后根据值重新编码(使用[iconv-lite](https://github.com/ashtuchkin/iconv-lite)支持中文编码如 gbk,gb2312 等)
