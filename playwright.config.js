import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./tests/browser',fullyParallel:true,workers:2,use:{baseURL:'http://127.0.0.1:4173/InterviewPrep/',browserName:'chromium',headless:true},webServer:{command:'node scripts/serve.mjs',url:'http://127.0.0.1:4173/InterviewPrep/',reuseExistingServer:!process.env.CI},reporter:'list'});
