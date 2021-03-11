#!/usr/bin/env node

import { argv } from "node:process";
import id64 from "./lib/esm/index.mjs";
const n = Number(argv[2] || '1');
console.log([...Array(n).keys()].map(_ => id64.gen()).join('\n'));
