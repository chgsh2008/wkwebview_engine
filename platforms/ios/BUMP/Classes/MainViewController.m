/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

//
//  MainViewController.h
//  BUMP
//
//  Created by ___FULLUSERNAME___ on ___DATE___.
//  Copyright ___ORGANIZATIONNAME___ ___YEAR___. All rights reserved.
//

#import "MainViewController.h"
#import "NSFileManager+Extra.h"

@implementation MainViewController

- (id)initWithNibName:(NSString*)nibNameOrNil bundle:(NSBundle*)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Uncomment to override the CDVCommandDelegateImpl used
        // _commandDelegate = [[MainCommandDelegate alloc] initWithViewController:self];
        // Uncomment to override the CDVCommandQueue used
        // _commandQueue = [[MainCommandQueue alloc] initWithViewController:self];
    }
    return self;
}

- (id)init
{
    self = [super init];
    if (self) {
        NSError *error = nil;
        BOOL success = NO;
        NSFileManager *fm = [NSFileManager defaultManager];
        //create directory
        success = [fm createDirectoryAtURL:[self wwwRuntimeDirectory] withIntermediateDirectories:YES attributes:nil error:&error];
        NSLog(@"document path: %@",[self wwwRuntimeDirectory]);
        NSLog(@"bundle path: %@",[self wwwBundleDirectory]);
        //copy
        success = [fm copyFolderAtURL:[self wwwBundleDirectory] toURL:[NSFileManager wwwRuntimeDirectory] error:&error];
        if (!success) NSLog(@"复制www目录失败,%@", error);
        
        NSURL *configUrl = [[[NSBundle mainBundle] bundleURL] URLByAppendingPathComponent:@"config.xml"];
        success = [fm copyItemAtURL:configUrl toURL:[[NSFileManager wwwRuntimeDirectory] URLByAppendingPathComponent:@"config.xml"] error:&error];
        if (!success) NSLog(@"复制config失败,%@", error);
        
        
        NSURL *www = [self wwwRuntimeDirectory];
        NSURL *demoIndex = [www URLByAppendingPathComponent:@"com.infinitus.bslH5.demo/index.html"];
//        NSURL *demoIndex = [www URLByAppendingPathComponent:@"com.infinitus.eln/index.html"];
        self.startPage = [demoIndex absoluteString];
//        self.startPage = @"com.infinitus.bslH5.demo/index.html#com.infinitus.bslH5.demo/";
//        self.startPage = @"Demo/index.html";
        // Uncomment to override the CDVCommandDelegateImpl used
        // _commandDelegate = [[MainCommandDelegate alloc] initWithViewController:self];
        // Uncomment to override the CDVCommandQueue used
        // _commandQueue = [[MainCommandQueue alloc] initWithViewController:self];
    }
    return self;
}

//应用运行时的www目录
- (NSURL *)wwwRuntimeDirectory
{
    return [[self applicationDocumentsDirectory] URLByAppendingPathComponent:@"www" isDirectory:YES];
}

//应用文档根目录
- (NSURL *)applicationDocumentsDirectory
{
    //    NSURL *url =[[[NSFileManager defaultManager] URLsForDirectory:NSCachesDirectory inDomains:NSUserDomainMask] lastObject];
    // add by arvin.chou DOCUMENT目录
    //    return [[[NSFileManager defaultManager] URLsForDirectory:NSDocumentDirectory inDomains:NSUserDomainMask] lastObject];
    // add by arvin.chou 将根目录指向LIBRARY/CACHE目录
    //    return [[[NSFileManager defaultManager] URLsForDirectory:NSCachesDirectory inDomains:NSUserDomainMask] lastObject];
    
    return [[[NSFileManager defaultManager] URLsForDirectory:NSDocumentDirectory inDomains:NSUserDomainMask] lastObject];
    
}

//应用安装包里的www目录
- (NSURL *)wwwBundleDirectory
{
    return [[[NSBundle mainBundle] bundleURL] URLByAppendingPathComponent:@"www" isDirectory:YES];
}

- (void)didReceiveMemoryWarning
{
    // Releases the view if it doesn't have a superview.
    [super didReceiveMemoryWarning];

    // Release any cached data, images, etc that aren't in use.
}

#pragma mark View lifecycle

- (void)viewWillAppear:(BOOL)animated
{
    // View defaults to full size.  If you want to customize the view's size, or its subviews (e.g. webView),
    // you can do so here.

    [super viewWillAppear:animated];
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
}

- (void)viewDidUnload
{
    [super viewDidUnload];
    // Release any retained subviews of the main view.
    // e.g. self.myOutlet = nil;
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    // Return YES for supported orientations
    return [super shouldAutorotateToInterfaceOrientation:interfaceOrientation];
}

/* Comment out the block below to over-ride */

/*
- (UIWebView*) newCordovaViewWithFrame:(CGRect)bounds
{
    return[super newCordovaViewWithFrame:bounds];
}
*/

@end

@implementation MainCommandDelegate

/* To override the methods, uncomment the line in the init function(s)
   in MainViewController.m
 */

#pragma mark CDVCommandDelegate implementation

- (id)getCommandInstance:(NSString*)className
{
    return [super getCommandInstance:className];
}

- (NSString*)pathForResource:(NSString*)resourcepath
{
    return [super pathForResource:resourcepath];
}

@end

@implementation MainCommandQueue

/* To override, uncomment the line in the init function(s)
   in MainViewController.m
 */
- (BOOL)execute:(CDVInvokedUrlCommand*)command
{
    return [super execute:command];
}

@end
