import * as singleSpa from "single-spa";
import confs from "./appConf/importConf.js";

function loadAppCss(url) {
  return System.import(url)
    .then(module => {
      return module.default;
    })
    .then(manifest => {
      const { entrypoints, publicPath } = manifest;
      const cssAssets = entrypoints["app"].assets.filter(
        a => a === "common.css"
      );
      const element = document.createElement("link");
      element.href = publicPath + cssAssets[0];
      element.rel = "stylesheet";
      element.type = "text/css";
      document.head.appendChild(element);
    })
    .catch(e => {
      console.log(e);
    });
}

function loadApp(url) {
  return System.import(url)
    .then(module => {
      return module.default;
    })
    .then(manifest => {
      const { entrypoints, publicPath } = manifest;
      const jsAssets = entrypoints["app"].assets.filter(a => a === "app.js");
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
  loadAppCss(target.url);
  singleSpa.registerApplication(
    target.name,
    () => {
      return loadApp(target.url);
    },
    () => {
      if (target.name === "COMMON") return true;
      else return location.pathname === target.path;
    }
  );
}

singleSpa.start();
