const basePath = ""; //import.meta.env.BASE_URL;

export default [
  {
    type: "msdf",
    fontFamily: "Inter",
    descriptors: {
      weight: 400,
    },
    atlasDataUrl: basePath + "fonts/Inter_18pt-Regular.msdf.json",
    atlasUrl: basePath + "fonts/Inter_18pt-Regular.msdf.png",
  } as const,
  {
    type: "msdf",
    fontFamily: "Inter",
    descriptors: {
      weight: 600,
    },
    atlasDataUrl: basePath + "fonts/Inter_18pt-SemiBold.msdf.json",
    atlasUrl: basePath + "fonts/Inter_18pt-SemiBold.msdf.png",
  } as const,
  {
    type: "msdf",
    fontFamily: "Inter",
    descriptors: {
      weight: 700,
    },
    atlasDataUrl: basePath + "fonts/Inter_18pt-Bold.msdf.json",
    atlasUrl: basePath + "fonts/Inter_18pt-Bold.msdf.png",
  } as const,
  {
    type: "msdf",
    fontFamily: "Roboto",
    descriptors: {
      weight: 700,
    },
    atlasDataUrl: basePath + "fonts/Roboto-Bold.msdf.json",
    atlasUrl: basePath + "fonts/Roboto-Bold.msdf.png",
  } as const,
  {
    type: "msdf",
    fontFamily: "Roboto",
    descriptors: {
      weight: 400,
    },
    atlasDataUrl: basePath + "fonts/Roboto-Regular.msdf.json",
    atlasUrl: basePath + "fonts/Roboto-Regular.msdf.png",
  } as const,
  {
    type: "msdf",
    fontFamily: "Arial",
    descriptors: {
      weight: 500,
    },
    atlasDataUrl: basePath + "fonts/Roboto-Regular.msdf.json",
    atlasUrl: basePath + "fonts/Roboto-Regular.msdf.png",
  } as const,
];
