if (figma.editorType === "dev" && figma.mode === "codegen") {
  // Register a callback to the "generate" event
  figma.codegen.on("generate", ({ node }) => {
    return [
      {
        title: "Code",
        language: "TYPESCRIPT",
        code: "hello world",
      },
    ];
  });
} else {
  figma.notify("Codegen plugin can only be run in Figma Dev mode.");
  figma.closePlugin();
}
