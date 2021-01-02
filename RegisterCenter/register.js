import * as singleSpa from "single-spa";
import confs from "./appConf/importConf.js";
import { create } from "domain";

function loadAppCss(path) {
  const element = document.createElement("link");
  element.href = path;
  element.rel = "stylesheet";
  element.type = "text/css";
  document.head.appendChild(element);
}

function loadApp(url) {
  return System.import(url)
    .then(module => {
      console.log(module);
      return module.default;
    })
    .then(manifest => {
      const { entrypoints, publicPath } = manifest;
      const jsAssets = entrypoints["app"].assets.filter(a => a === "app.js");
      const cssAssets = entrypoints["app"].assets.filter(
        a => a === "common.css"
      );
      loadAppCss(publicPath + cssAssets[0]);
      return System.import(publicPath + jsAssets[0]);
    })
    .catch(e => {
      console.log(e);
    });
}

confs.forEach(conf => {
  register(conf);
});

function register(target) {
  singleSpa.registerApplication(
    target.name,
    () => {
      return loadApp(target.url);
    },
    () => {
      return location.pathname === target.path;
    }
  );
}

singleSpa.start();
