<template>
    <div>
ada    </div>
  </template>
  
  <script setup>
import { onMounted } from 'vue';
const actiond = ()=>{
  if (!("Notification" in window)) {
    // Check if the browser supports notifications
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    const notification = new Notification("Hi there!");
    // …
  } else if (Notification.permission === "denied") {
    // We need to ask the user for permission
    const notification = new Notification("denied!");
  }else if (Notification.permission !== "denied") {
    // We need to ask the user for permission
    const notification = new Notification("DEFAULT!");
  }
}
  onMounted(()=>{
    const n = new Notification("Allow Your Notification Now");
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    // The tab has become visible so clear the now-stale Notification.
    n.close();
  }
});
    });
  </script>
  
  <style>
  /* Add any styles you want */
  </style>