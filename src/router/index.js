import {createRouter, createWebHistory} from "vue-router";
import graph from "./modules/graph.js";

export default createRouter({
    history: createWebHistory(),
    routes: [
        ...graph,
    ]
})