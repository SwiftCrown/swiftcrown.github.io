import * as matter from 'gray-matter';
import {bundleMDX} from 'mdx-bundler';
import path from 'path';

export var blogs = [];

/**
 *  @function This function is to get the content of a post which should be a mdx file.
 *  @param path the file path of the post.
 */
export function getBlogContent(path){
   const fs = require('fs');
   const content = fs.readFileSync(path,'utf-8');
   return content;
}

/**
 * @function This function get all md and mdx file which in contents folder.
 *  
 */
 export function getBlogsList(){
   const fs = require('fs');
   const list = fs.readdirSync('./contents','utf-8');
   return list;
}

/**
 * @function This function get all md and mdx file which in contents folder.
 */
export async function getBlogs(){
   if(blogs.length==0){
      const list = getBlogsList();
      const files = list.map(
         (filename)=>getBlogContent(path.join('./contents',filename))
      );
      for (var file in files){
         const mdx = await bundleMDX({source:file});
         blogs.push(mdx);
      }
   }
   console.log(blogs);
   return blogs;
}