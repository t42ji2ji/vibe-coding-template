#!/usr/bin/env node

const path = require("path");
const fs = require("fs-extra");
const { Command } = require("commander");
const chalk = require("chalk");

const program = new Command();

program
  .name("create-vibe-template")
  .description("Create a new project with vibe coding template")
  .argument("<project-directory>", "Directory to create the project in")
  .action((projectDirectory) => {
    const templateDir = path.resolve(__dirname, "../template");
    const targetDir = path.resolve(process.cwd(), projectDirectory);

    if (fs.existsSync(targetDir)) {
      console.error(
        chalk.red(`Error: Directory ${projectDirectory} already exists`)
      );
      process.exit(1);
    }

    console.log(chalk.blue(`Creating a new project in ${targetDir}`));

    fs.copySync(templateDir, targetDir);

    console.log(chalk.green("Project created successfully!"));
    console.log("");
    console.log("Next steps:");
    console.log(`  cd ${projectDirectory}`);
    console.log("  pnpm install");
    console.log("  pnpm dev");
  });

program.parse();
