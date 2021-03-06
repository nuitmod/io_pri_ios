//import {html, render} from 'https://unpkg.com/lit-html?module';
import { html, Component, render } from 'https://unpkg.com/htm/preact/index.mjs?module';
import { observer } from '../modules/mobx_preact.module.js';
import imob from "./mobx_store.js";
import { autorun, toJS } from '../modules/mobx.module.js';
import  * as jQuery from "https://unpkg.com/jquery@3.5.1/dist/jquery.min.js";
//import  * as _ from "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.19/lodash.min.js";
//import * as amp from "https://cdn.ampproject.org/v0.js";
//import * as amp_carousel from "https://cdn.ampproject.org/v0/amp-carousel-0.2.js";

var $ = window.jQuery;
//var __ = window._;

var temp={
  name: ''
}

var add_to_bug=e=>{
  imob.message= e.target.dataset.name + " added to bug"
  console.log(e.target.id);
}

var show_res=e=>{
  imob.type=e.target.value.toLowerCase(); //console.log(temp.name);
//  temp.name="";
  $('.big_i').hide();
}

var handle_submit=e=>{
  e.preventDefault();
//  temp.name=""
  console.log(imob.type);
}

var hide_big=w=>{
  w.active=false;
  $('.big_i').hide();
}

var I_search=()=>{

var big_item=imob.data.filter(wm=>wm.active==true).map(wm=>html`
  <div class="big_i" key=${wm.id} >
    <img id=${wm.img_id} src="./img/${wm.img_id}.JPG"  height="139" width="92" />
    <!-- <amp-carousel
    layout="responsive"
    type="slides"
    role="region"
    aria-label="Basic carousel"
    autoplay
    delay="3000"
    >
    <amp-img src="./img/${wm.img_id}.JPG" width="200" height="90"></amp-img>
    <amp-img src="./img/pin1.JPG" width="200" height="90"></amp-img>
    </amp-carousel> -->
    <div>
      <li>name: ${wm.name} </li>
      <li>color: ${wm.color} </li>
      <li>category: ${wm.category} </li>
      <div id="btn">
        <button id=${wm.img_id} data-name=${wm.category} onclick=${add_to_bug}>add</button>${'  '}
        <button id=${wm.img_id} onclick=${()=>hide_big(wm)}>close</button>
      </div>
    </div>
  </div>`)


var wm_list=imob.data.filter(w=>w.category==imob.type).map(wm=>html`
  <div class="list" key=${wm.id}>
    <img id=${wm.img_id} src="./img/${wm.img_id}.JPG"  height="89" width="52" />
     <div>
      <li>name: ${wm.name} </li>
      <li>color: ${wm.color} </li>
      <li>category: ${wm.category} </li>
      <button id=${wm.img_id} class="show" value="show" onclick=${()=>imob.set_active(wm)}>show</button>
    </div>
   </div>`
  )


return html`
<form onsubmit=${handle_submit}>
  <input placeholder="${temp.name}" onchange=${show_res} oninput="${e=>imob.inf=e.target.value}" />
</form>
  <h4>${imob.inf}</h4>
  ${wm_list}
  ${big_item}
`
}

export default observer(I_search);
//export {ch_filter}
