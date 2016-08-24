define([],function() {
       var IO = {
       description: "文件系统",
       // 只读，程序安装目录
       applicationDirectory: cordova.file.applicationDirectory,
       // 程序可写私有存储可写根目录
       applicationStorageDirectory: cordova.file.applicationStorageDirectory,
       // 存放特别的数据文件目录
       dataDirectory: cordova.file.dataDirectory,
       // 缓存文件，程序重启文件还一直在.
       // 程序不应该依赖于系统删除这些文件.
       cacheDirectory: cordova.file.cacheDirectory,
       // Android外存储应用程序.
       externalApplicationStorageDirectory: cordova.file.externalApplicationStorageDirectory,
       // Android: 外存储用于存放特别的数据文件目录.
       externalDataDirectory: cordova.file.externalDataDirectory,
       // Android: 外存储用于存放缓存文件目录.
       externalCacheDirectory: cordova.file.externalCacheDirectory,
       // Android: SD card卡跟目录.
       externalRootDirectory: cordova.file.externalRootDirectory,
       // iOS: 零时文件，系统可能会清除的文件目录.
       tempDirectory: cordova.file.tempDirectory,
       // iOS: 存储系统同步的特性文件目录.
       syncedDataDirectory: cordova.file.syncedDataDirectory,
       // iOS: 应用程序存放文件主目录
       documentsDirectory: cordova.file.documentsDirectory,
       // BlackBerry10: 共享文件夹
       sharedDirectory: cordova.file.sharedDirectory,
       
       
       //文件读取
       FileReader: window.FileReader,
       //文件系统中的目录对象，用于管理特定的本地目录
       DirectoryEntry: window.DirectoryEntry,
       //读取目录信息对象，用于获取目录中包含的文件及子目录
       DirectoryReader: window.DirectoryReader,
       //文件系统中的文件数据对象，用于获取文件的数据
       File: window.File,
       //文件系统中的文件对象，用于管理特定的本地文件
       FileEntry: window.FileEntry,
       //文件系统中的读取文件对象，用于获取文件的内容
       FileReader: window.FileReader,
       //文件系统中的写文件对象，用于写入文件内容
       FileWriter: window.FileWriter,
       //文件系统对象，用于管理特定本地文件目录
       //FileSystem:
       //JSON对象，获取文件操作的参数
       Flags: window.Flags,
       //JSON对象，保存文件或目录的状态信息对象
       Metadata: window.Metadata,
       //文件或目录操作事件对象
       FileEvent: window.ProgressEvent,
       //文件路径类型
       //URLType:
       //相对路径URL
       //RelativeURL:
       //本地路径URL
       //LocalURL:
       //网络路径URL
       //RemoteURL:
       //请求系统目录，成功后返回fileSystem
       requestFileSystem:window.requestFileSystem,
       //通过URL参数获取目录对象或文件对象
       resolveLocalFileSystemURI:window.resolveLocalFileSystemURI,
       
       };
       return IO;
       
       });