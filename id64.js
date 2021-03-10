#!/usr/bin/env node

import { argv } from "node:process";
import * as id64 from "./lib/esm/index.js";
const n = Number(argv[2] || '1');
console.log([...Array(n).keys()].map(_ => id64.gen()).join('\n'));
