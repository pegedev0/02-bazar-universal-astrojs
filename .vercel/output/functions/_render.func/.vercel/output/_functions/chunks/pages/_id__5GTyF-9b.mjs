/* empty css                          */
import 'html-escaper';
import { A as AstroError, c as InvalidImageService, d as ExpectedImageOptions, E as ExpectedImage, e as createAstro, f as createComponent, g as ImageMissingAlt, r as renderTemplate, m as maybeRenderHead, h as addAttribute, s as spreadAttributes, i as renderComponent, j as renderHead, k as renderSlot } from '../astro_JoLp8WV8.mjs';
import 'kleur/colors';
import 'clsx';
import { i as isESMImportedImage, a as isLocalService, b as isRemoteImage, D as DEFAULT_HASH_PROPS } from '../astro/assets-service_kXLA1hwI.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
/* empty css                          */

async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      '../astro/assets-service_kXLA1hwI.mjs'
    ).then(n => n.g).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset)
      globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  if (typeof options.src === "undefined") {
    throw new AstroError({
      ...ExpectedImage,
      message: ExpectedImage.message(
        options.src,
        "undefined",
        JSON.stringify(options)
      )
    });
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: typeof options.src === "object" && "then" in options.src ? (await options.src).default ?? await options.src : options.src
  };
  const originalPath = isESMImportedImage(resolvedOptions.src) ? resolvedOptions.src.fsPath : resolvedOptions.src;
  const clonedSrc = isESMImportedImage(resolvedOptions.src) ? (
    // @ts-expect-error - clone is a private, hidden prop
    resolvedOptions.src.clone ?? resolvedOptions.src
  ) : resolvedOptions.src;
  resolvedOptions.src = clonedSrc;
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  const srcSetTransforms = service.getSrcSet ? await service.getSrcSet(validatedOptions, imageConfig) : [];
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  let srcSets = await Promise.all(
    srcSetTransforms.map(async (srcSet) => ({
      transform: srcSet.transform,
      url: await service.getURL(srcSet.transform, imageConfig),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }))
  );
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    const propsToHash = service.propertiesToHash ?? DEFAULT_HASH_PROPS;
    imageURL = globalThis.astroAsset.addStaticImage(validatedOptions, propsToHash, originalPath);
    srcSets = srcSetTransforms.map((srcSet) => ({
      transform: srcSet.transform,
      url: globalThis.astroAsset.addStaticImage(srcSet.transform, propsToHash, originalPath),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }));
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    srcSet: {
      values: srcSets,
      attribute: srcSets.map((srcSet) => `${srcSet.url} ${srcSet.descriptor}`).join(", ")
    },
    attributes: service.getHTMLAttributes !== void 0 ? await service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

const $$Astro$7 = createAstro();
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  const additionalAttributes = {};
  if (image.srcSet.values.length > 0) {
    additionalAttributes.srcset = image.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(additionalAttributes)}${spreadAttributes(image.attributes)}>`;
}, "C:/Users/pepeg/OneDrive - UNIVERSIDAD DE SEVILLA/Dev/Pruebas Tecnicas/pruebastecnicas.com/02-bazar-universal/node_modules/astro/components/Image.astro", void 0);

const $$Astro$6 = createAstro();
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Picture;
  const defaultFormats = ["webp"];
  const defaultFallbackFormat = "png";
  const specialFormatsFallback = ["gif", "svg", "jpg", "jpeg"];
  const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  const optimizedImages = await Promise.all(
    formats.map(
      async (format) => await getImage({ ...props, format, widths: props.widths, densities: props.densities })
    )
  );
  let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
  if (!fallbackFormat && isESMImportedImage(props.src) && specialFormatsFallback.includes(props.src.format)) {
    resultFallbackFormat = props.src.format;
  }
  const fallbackImage = await getImage({
    ...props,
    format: resultFallbackFormat,
    widths: props.widths,
    densities: props.densities
  });
  const imgAdditionalAttributes = {};
  const sourceAdditionaAttributes = {};
  if (props.sizes) {
    sourceAdditionaAttributes.sizes = props.sizes;
  }
  if (fallbackImage.srcSet.values.length > 0) {
    imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<picture${spreadAttributes(pictureAttributes)}> ${Object.entries(optimizedImages).map(([_, image]) => {
    const srcsetAttribute = props.densities || !props.densities && !props.widths ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute;
    return renderTemplate`<source${addAttribute(srcsetAttribute, "srcset")}${addAttribute("image/" + image.options.format, "type")}${spreadAttributes(sourceAdditionaAttributes)}>`;
  })} <img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(imgAdditionalAttributes)}${spreadAttributes(fallbackImage.attributes)}> </picture>`;
}, "C:/Users/pepeg/OneDrive - UNIVERSIDAD DE SEVILLA/Dev/Pruebas Tecnicas/pruebastecnicas.com/02-bazar-universal/node_modules/astro/components/Picture.astro", void 0);

const imageConfig = {"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":[],"remotePatterns":[]};
					new URL("file:///C:/Users/pepeg/OneDrive%20-%20UNIVERSIDAD%20DE%20SEVILLA/Dev/Pruebas%20Tecnicas/pruebastecnicas.com/02-bazar-universal/.vercel/output/static/");
					const getImage = async (options) => await getImage$1(options, imageConfig);

const truckImage = new Proxy({"src":"/_astro/truck.dsyljzsy.webp","width":500,"height":500,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/pepeg/OneDrive - UNIVERSIDAD DE SEVILLA/Dev/Pruebas Tecnicas/pruebastecnicas.com/02-bazar-universal/public/truck.webp";
							}
							
							return target[name];
						}
					});

function SearchForm({ withBtn = true, customPlaceholder }) {
  const [key, setKey] = useState();
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (key !== void 0) {
      window.location.href = `/items?search=${key}`;
    }
  };
  const handleChange = (evt) => {
    setKey(evt.target.value);
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row mb-5", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          onChange: handleChange,
          className: "bg-neutral-300 py-2 px-2 w-60",
          type: "text",
          placeholder: customPlaceholder ? customPlaceholder : "laptops, smartphones, ...",
          maxLength: "20"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "-ml-10 mt-2", children: /* @__PURE__ */ jsxs(
        "svg",
        {
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          strokeWidth: "2",
          stroke: "gray",
          fill: "none",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M21 21l-6 -6"
              }
            )
          ]
        }
      ) })
    ] }),
    withBtn ? /* @__PURE__ */ jsx("button", { className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded-2xl transform transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 w-32", children: "Buscar" }) : null
  ] });
}

const $$Astro$5 = createAstro();
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Header;
  const key = Astro2.url.toString().split("=")[1];
  return renderTemplate`${maybeRenderHead()}<header class="flex justify-between mx-5 md:mx-20 my-5 pb-3"> <a href="/"> ${renderComponent($$result, "Image", $$Image, { "src": truckImage, "alt": "Truck Bazar Universal", "width": 80, "height": 80 })} </a> <div class="my-auto"> ${renderComponent($$result, "SearchForm", SearchForm, { "withBtn": false, "customPlaceholder": key, "client:visible": true, "client:component-hydration": "visible", "client:component-path": "C:/Users/pepeg/OneDrive - UNIVERSIDAD DE SEVILLA/Dev/Pruebas Tecnicas/pruebastecnicas.com/02-bazar-universal/src/components/SearchForm", "client:component-export": "default" })} </div> </header>`;
}, "C:/Users/pepeg/OneDrive - UNIVERSIDAD DE SEVILLA/Dev/Pruebas Tecnicas/pruebastecnicas.com/02-bazar-universal/src/components/Header.astro", void 0);

const $$Astro$4 = createAstro();
const $$GitHubIcon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$GitHubIcon;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(Astro2.props)} viewBox="0 0 256 250" width="256" height="250" fill="currentColor" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 256"><path d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Zm-80.06 182.34c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931Zm6.296 5.618c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm4.32 7.188c-.785.545-2.067.034-2.86-1.104-.784-1.138-.784-2.503.017-3.05.795-.547 2.058-.055 2.861 1.075.782 1.157.782 2.522-.019 3.08Zm7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403Z" fill="#545454"></path></svg>`;
}, "C:/Users/pepeg/OneDrive - UNIVERSIDAD DE SEVILLA/Dev/Pruebas Tecnicas/pruebastecnicas.com/02-bazar-universal/src/components/icons/GitHubIcon.astro", void 0);

const $$Astro$3 = createAstro();
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead()}<footer class="flex flex-col items-center justify-center w-full py-2 mt-9"> <div class="border-t-2 border-neutral-300 w-full"> <div class="flex flex-row gap-2 items-center justify-center"> <span class="flex justify-center items-center mt-3 font-semibold text-black opacity-70">© 2024 -<a href="https://github.com/pegedev0" target="_blank" class="ml-1">pegedev0</a></span> <a href="https://github.com/pegedev0" target="_blank">${renderComponent($$result, "GitHubIcon", $$GitHubIcon, { "class": "size-6 mt-2" })}</a> </div> </div> </footer>`;
}, "C:/Users/pepeg/OneDrive - UNIVERSIDAD DE SEVILLA/Dev/Pruebas Tecnicas/pruebastecnicas.com/02-bazar-universal/src/components/Footer.astro", void 0);

const $$Astro$2 = createAstro();
const $$ViewTransitions = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "C:/Users/pepeg/OneDrive - UNIVERSIDAD DE SEVILLA/Dev/Pruebas Tecnicas/pruebastecnicas.com/02-bazar-universal/node_modules/astro/components/ViewTransitions.astro", void 0);

const $$Astro$1 = createAstro();
const $$StoreLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$StoreLayout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderComponent($$result, "ViewTransitions", $$ViewTransitions, {})}${renderHead()}</head> <body class="px-10"> ${renderComponent($$result, "Header", $$Header, {})} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "C:/Users/pepeg/OneDrive - UNIVERSIDAD DE SEVILLA/Dev/Pruebas Tecnicas/pruebastecnicas.com/02-bazar-universal/src/layouts/StoreLayout.astro", void 0);

const products = [
	{
		id: 1,
		title: "iPhone 9",
		description: "An apple mobile which is nothing like apple",
		price: 549,
		discountPercentage: 12.96,
		rating: 4.69,
		stock: 94,
		brand: "Apple",
		category: "smartphones",
		thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
		images: [
			"https://i.dummyjson.com/data/products/1/1.jpg",
			"https://i.dummyjson.com/data/products/1/2.jpg",
			"https://i.dummyjson.com/data/products/1/3.jpg",
			"https://i.dummyjson.com/data/products/1/4.jpg",
			"https://i.dummyjson.com/data/products/1/thumbnail.jpg"
		]
	},
	{
		id: 2,
		title: "iPhone X",
		description: "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
		price: 899,
		discountPercentage: 17.94,
		rating: 4.44,
		stock: 34,
		brand: "Apple",
		category: "smartphones",
		thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
		images: [
			"https://i.dummyjson.com/data/products/2/1.jpg",
			"https://i.dummyjson.com/data/products/2/2.jpg",
			"https://i.dummyjson.com/data/products/2/3.jpg",
			"https://i.dummyjson.com/data/products/2/thumbnail.jpg"
		]
	},
	{
		id: 3,
		title: "Samsung Universe 9",
		description: "Samsung's new variant which goes beyond Galaxy to the Universe",
		price: 1249,
		discountPercentage: 15.46,
		rating: 4.09,
		stock: 36,
		brand: "Samsung",
		category: "smartphones",
		thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
		images: [
			"https://i.dummyjson.com/data/products/3/1.jpg"
		]
	},
	{
		id: 4,
		title: "OPPOF19",
		description: "OPPO F19 is officially announced on April 2021.",
		price: 280,
		discountPercentage: 17.91,
		rating: 4.3,
		stock: 123,
		brand: "OPPO",
		category: "smartphones",
		thumbnail: "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
		images: [
			"https://i.dummyjson.com/data/products/4/1.jpg",
			"https://i.dummyjson.com/data/products/4/2.jpg",
			"https://i.dummyjson.com/data/products/4/3.jpg",
			"https://i.dummyjson.com/data/products/4/4.jpg",
			"https://i.dummyjson.com/data/products/4/thumbnail.jpg"
		]
	},
	{
		id: 5,
		title: "Huawei P30",
		description: "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
		price: 499,
		discountPercentage: 10.58,
		rating: 4.09,
		stock: 32,
		brand: "Huawei",
		category: "smartphones",
		thumbnail: "https://i.dummyjson.com/data/products/5/thumbnail.jpg",
		images: [
			"https://i.dummyjson.com/data/products/5/1.jpg",
			"https://i.dummyjson.com/data/products/5/2.jpg",
			"https://i.dummyjson.com/data/products/5/3.jpg"
		]
	},
	{
		id: 6,
		title: "MacBook Pro",
		description: "MacBook Pro 2021 with mini-LED display may launch between September, November",
		price: 1749,
		discountPercentage: 11.02,
		rating: 4.57,
		stock: 83,
		brand: "Apple",
		category: "laptops",
		thumbnail: "https://i.dummyjson.com/data/products/6/thumbnail.png",
		images: [
			"https://i.dummyjson.com/data/products/6/1.png",
			"https://i.dummyjson.com/data/products/6/2.jpg",
			"https://i.dummyjson.com/data/products/6/3.png",
			"https://i.dummyjson.com/data/products/6/4.jpg"
		]
	},
	{
		id: 7,
		title: "Samsung Galaxy Book",
		description: "Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
		price: 1499,
		discountPercentage: 4.15,
		rating: 4.25,
		stock: 50,
		brand: "Samsung",
		category: "laptops",
		thumbnail: "https://i.dummyjson.com/data/products/7/thumbnail.jpg",
		images: [
			"https://i.dummyjson.com/data/products/7/1.jpg",
			"https://i.dummyjson.com/data/products/7/2.jpg",
			"https://i.dummyjson.com/data/products/7/3.jpg",
			"https://i.dummyjson.com/data/products/7/thumbnail.jpg"
		]
	},
	{
		id: 8,
		title: "Microsoft Surface Laptop 4",
		description: "Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.",
		price: 1499,
		discountPercentage: 10.23,
		rating: 4.43,
		stock: 68,
		brand: "Microsoft Surface",
		category: "laptops",
		thumbnail: "https://i.dummyjson.com/data/products/8/thumbnail.jpg",
		images: [
			"https://i.dummyjson.com/data/products/8/1.jpg",
			"https://i.dummyjson.com/data/products/8/2.jpg",
			"https://i.dummyjson.com/data/products/8/3.jpg",
			"https://i.dummyjson.com/data/products/8/4.jpg",
			"https://i.dummyjson.com/data/products/8/thumbnail.jpg"
		]
	},
	{
		id: 9,
		title: "Infinix INBOOK",
		description: "Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty",
		price: 1099,
		discountPercentage: 11.83,
		rating: 4.54,
		stock: 96,
		brand: "Infinix",
		category: "laptops",
		thumbnail: "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
		images: [
			"https://i.dummyjson.com/data/products/9/1.jpg",
			"https://i.dummyjson.com/data/products/9/2.png",
			"https://i.dummyjson.com/data/products/9/3.png",
			"https://i.dummyjson.com/data/products/9/4.jpg",
			"https://i.dummyjson.com/data/products/9/thumbnail.jpg"
		]
	},
	{
		id: 10,
		title: "HP Pavilion 15-DK1056WM",
		description: "HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10",
		price: 1099,
		discountPercentage: 6.18,
		rating: 4.43,
		stock: 89,
		brand: "HP Pavilion",
		category: "laptops",
		thumbnail: "https://i.dummyjson.com/data/products/10/thumbnail.jpeg",
		images: [
			"https://i.dummyjson.com/data/products/10/1.jpg",
			"https://i.dummyjson.com/data/products/10/2.jpg",
			"https://i.dummyjson.com/data/products/10/3.jpg",
			"https://i.dummyjson.com/data/products/10/thumbnail.jpeg"
		]
	},
	{
		id: 11,
		title: "perfume Oil",
		description: "Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil",
		price: 13,
		discountPercentage: 8.4,
		rating: 4.26,
		stock: 65,
		brand: "Impression of Acqua Di Gio",
		category: "fragrances",
		thumbnail: "https://i.dummyjson.com/data/products/11/thumbnail.jpg",
		images: [
			"https://i.dummyjson.com/data/products/11/1.jpg",
			"https://i.dummyjson.com/data/products/11/2.jpg",
			"https://i.dummyjson.com/data/products/11/3.jpg",
			"https://i.dummyjson.com/data/products/11/thumbnail.jpg"
		]
	},
	{
		id: 12,
		title: "Brown Perfume",
		description: "Royal_Mirage Sport Brown Perfume for Men & Women - 120ml",
		price: 40,
		discountPercentage: 15.66,
		rating: 4,
		stock: 52,
		brand: "Royal_Mirage",
		category: "fragrances",
		thumbnail: "https://i.dummyjson.com/data/products/12/thumbnail.jpg",
		images: [
			"https://i.dummyjson.com/data/products/12/1.jpg",
			"https://i.dummyjson.com/data/products/12/2.jpg",
			"https://i.dummyjson.com/data/products/12/3.png",
			"https://i.dummyjson.com/data/products/12/4.jpg",
			"https://i.dummyjson.com/data/products/12/thumbnail.jpg"
		]
	},
	{
		id: 13,
		title: "Fog Scent Xpressio Perfume",
		description: "Product details of Best Fog Scent Xpressio Perfume 100ml For Men cool long lasting perfumes for Men",
		price: 13,
		discountPercentage: 8.14,
		rating: 4.59,
		stock: 61,
		brand: "Fog Scent Xpressio",
		category: "fragrances",
		thumbnail: "https://i.dummyjson.com/data/products/13/thumbnail.webp",
		images: [
			"https://i.dummyjson.com/data/products/13/1.jpg",
			"https://i.dummyjson.com/data/products/13/2.png",
			"https://i.dummyjson.com/data/products/13/3.jpg",
			"https://i.dummyjson.com/data/products/13/4.jpg",
			"https://i.dummyjson.com/data/products/13/thumbnail.webp"
		]
	},
	{
		id: 14,
		title: "Non-Alcoholic Concentrated Perfume Oil",
		description: "Original Al Munakh® by Mahal Al Musk | Our Impression of Climate | 6ml Non-Alcoholic Concentrated Perfume Oil",
		price: 120,
		discountPercentage: 15.6,
		rating: 4.21,
		stock: 114,
		brand: "Al Munakh",
		category: "fragrances",
		thumbnail: "https://i.dummyjson.com/data/products/14/thumbnail.jpg",
		images: [
			"https://i.dummyjson.com/data/products/14/1.jpg",
			"https://i.dummyjson.com/data/products/14/2.jpg",
			"https://i.dummyjson.com/data/products/14/3.jpg",
			"https://i.dummyjson.com/data/products/14/thumbnail.jpg"
		]
	},
	{
		id: 15,
		title: "Eau De Perfume Spray",
		description: "Genuine  Al-Rehab spray perfume from UAE/Saudi Arabia/Yemen High Quality",
		price: 30,
		discountPercentage: 10.99,
		rating: 4.7,
		stock: 105,
		brand: "Lord - Al-Rehab",
		category: "fragrances",
		thumbnail: "https://i.dummyjson.com/data/products/15/thumbnail.jpg",
		images: [
			"https://i.dummyjson.com/data/products/15/1.jpg",
			"https://i.dummyjson.com/data/products/15/2.jpg",
			"https://i.dummyjson.com/data/products/15/3.jpg",
			"https://i.dummyjson.com/data/products/15/4.jpg",
			"https://i.dummyjson.com/data/products/15/thumbnail.jpg"
		]
	},
	{
		id: 16,
		title: "Hyaluronic Acid Serum",
		description: "L'OrÃ©al Paris introduces Hyaluron Expert Replumping Serum formulated with 1.5% Hyaluronic Acid",
		price: 19,
		discountPercentage: 13.31,
		rating: 4.83,
		stock: 110,
		brand: "L'Oreal Paris",
		category: "skincare",
		thumbnail: "https://i.dummyjson.com/data/products/16/thumbnail.jpg",
		images: [
			"https://i.dummyjson.com/data/products/16/1.png",
			"https://i.dummyjson.com/data/products/16/2.webp",
			"https://i.dummyjson.com/data/products/16/3.jpg",
			"https://i.dummyjson.com/data/products/16/4.jpg",
			"https://i.dummyjson.com/data/products/16/thumbnail.jpg"
		]
	},
	{
		id: 17,
		title: "Tree Oil 30ml",
		description: "Tea tree oil contains a number of compounds, including terpinen-4-ol, that have been shown to kill certain bacteria,",
		price: 12,
		discountPercentage: 4.09,
		rating: 4.52,
		stock: 78,
		brand: "Hemani Tea",
		category: "skincare",
		thumbnail: "https://i.dummyjson.com/data/products/17/thumbnail.jpg",
		images: [
			"https://i.dummyjson.com/data/products/17/1.jpg",
			"https://i.dummyjson.com/data/products/17/2.jpg",
			"https://i.dummyjson.com/data/products/17/3.jpg",
			"https://i.dummyjson.com/data/products/17/thumbnail.jpg"
		]
	},
	{
		id: 18,
		title: "Oil Free Moisturizer 100ml",
		description: "Dermive Oil Free Moisturizer with SPF 20 is specifically formulated with ceramides, hyaluronic acid & sunscreen.",
		price: 40,
		discountPercentage: 13.1,
		rating: 4.56,
		stock: 88,
		brand: "Dermive",
		category: "skincare",
		thumbnail: "https://i.dummyjson.com/data/products/18/thumbnail.jpg",
		images: [
			"https://i.dummyjson.com/data/products/18/1.jpg",
			"https://i.dummyjson.com/data/products/18/2.jpg",
			"https://i.dummyjson.com/data/products/18/3.jpg",
			"https://i.dummyjson.com/data/products/18/4.jpg",
			"https://i.dummyjson.com/data/products/18/thumbnail.jpg"
		]
	},
	{
		id: 19,
		title: "Skin Beauty Serum.",
		description: "Product name: rorec collagen hyaluronic acid white face serum riceNet weight: 15 m",
		price: 46,
		discountPercentage: 10.68,
		rating: 4.42,
		stock: 54,
		brand: "ROREC White Rice",
		category: "skincare",
		thumbnail: "https://i.dummyjson.com/data/products/19/thumbnail.jpg",
		images: [
			"https://i.dummyjson.com/data/products/19/1.jpg",
			"https://i.dummyjson.com/data/products/19/2.jpg",
			"https://i.dummyjson.com/data/products/19/3.png",
			"https://i.dummyjson.com/data/products/19/thumbnail.jpg"
		]
	},
	{
		id: 20,
		title: "Freckle Treatment Cream- 15gm",
		description: "Fair & Clear is Pakistan's only pure Freckle cream which helpsfade Freckles, Darkspots and pigments. Mercury level is 0%, so there are no side effects.",
		price: 70,
		discountPercentage: 16.99,
		rating: 4.06,
		stock: 140,
		brand: "Fair & Clear",
		category: "skincare",
		thumbnail: "https://i.dummyjson.com/data/products/20/thumbnail.jpg",
		images: [
			"https://i.dummyjson.com/data/products/20/1.jpg",
			"https://i.dummyjson.com/data/products/20/2.jpg",
			"https://i.dummyjson.com/data/products/20/3.jpg",
			"https://i.dummyjson.com/data/products/20/4.jpg",
			"https://i.dummyjson.com/data/products/20/thumbnail.jpg"
		]
	},
	{
		id: 21,
		title: "- Daal Masoor 500 grams",
		description: "Fine quality Branded Product Keep in a cool and dry place",
		price: 20,
		discountPercentage: 4.81,
		rating: 4.44,
		stock: 133,
		brand: "Saaf & Khaas",
		category: "groceries",
		thumbnail: "https://i.dummyjson.com/data/products/21/thumbnail.png",
		images: [
			"https://i.dummyjson.com/data/products/21/1.png",
			"https://i.dummyjson.com/data/products/21/2.jpg",
			"https://i.dummyjson.com/data/products/21/3.jpg"
		]
	},
	{
		id: 22,
		title: "Elbow Macaroni - 400 gm",
		description: "Product details of Bake Parlor Big Elbow Macaroni - 400 gm",
		price: 14,
		discountPercentage: 15.58,
		rating: 4.57,
		stock: 146,
		brand: "Bake Parlor Big",
		category: "groceries",
		thumbnail: "https://i.dummyjson.com/data/products/22/thumbnail.jpg",
		images: [
			"https://i.dummyjson.com/data/products/22/1.jpg",
			"https://i.dummyjson.com/data/products/22/2.jpg",
			"https://i.dummyjson.com/data/products/22/3.jpg"
		]
	},
	{
		id: 23,
		title: "Orange Essence Food Flavou",
		description: "Specifications of Orange Essence Food Flavour For Cakes and Baking Food Item",
		price: 14,
		discountPercentage: 8.04,
		rating: 4.85,
		stock: 26,
		brand: "Baking Food Items",
		category: "groceries",
		thumbnail: "https://i.dummyjson.com/data/products/23/thumbnail.jpg",
		images: [
			"https://i.dummyjson.com/data/products/23/1.jpg",
			"https://i.dummyjson.com/data/products/23/2.jpg",
			"https://i.dummyjson.com/data/products/23/3.jpg",
			"https://i.dummyjson.com/data/products/23/4.jpg",
			"https://i.dummyjson.com/data/products/23/thumbnail.jpg"
		]
	},
	{
		id: 24,
		title: "cereals muesli fruit nuts",
		description: "original fauji cereal muesli 250gm box pack original fauji cereals muesli fruit nuts flakes breakfast cereal break fast faujicereals cerels cerel foji fouji",
		price: 46,
		discountPercentage: 16.8,
		rating: 4.94,
		stock: 113,
		brand: "fauji",
		category: "groceries",
		thumbnail: "https://i.dummyjson.com/data/products/24/thumbnail.jpg",
		images: [
			"https://i.dummyjson.com/data/products/24/1.jpg",
			"https://i.dummyjson.com/data/products/24/2.jpg",
			"https://i.dummyjson.com/data/products/24/3.jpg",
			"https://i.dummyjson.com/data/products/24/4.jpg",
			"https://i.dummyjson.com/data/products/24/thumbnail.jpg"
		]
	},
	{
		id: 25,
		title: "Gulab Powder 50 Gram",
		description: "Dry Rose Flower Powder Gulab Powder 50 Gram • Treats Wounds",
		price: 70,
		discountPercentage: 13.58,
		rating: 4.87,
		stock: 47,
		brand: "Dry Rose",
		category: "groceries",
		thumbnail: "https://i.dummyjson.com/data/products/25/thumbnail.jpg",
		images: [
			"https://i.dummyjson.com/data/products/25/1.png",
			"https://i.dummyjson.com/data/products/25/2.jpg",
			"https://i.dummyjson.com/data/products/25/3.png",
			"https://i.dummyjson.com/data/products/25/4.jpg",
			"https://i.dummyjson.com/data/products/25/thumbnail.jpg"
		]
	},
	{
		id: 26,
		title: "Plant Hanger For Home",
		description: "Boho Decor Plant Hanger For Home Wall Decoration Macrame Wall Hanging Shelf",
		price: 41,
		discountPercentage: 17.86,
		rating: 4.08,
		stock: 131,
		brand: "Boho Decor",
		category: "homedecoration",
		thumbnail: "https://i.dummyjson.com/data/products/26/thumbnail.jpg",
		images: [
			"https://i.dummyjson.com/data/products/26/1.jpg",
			"https://i.dummyjson.com/data/products/26/2.jpg",
			"https://i.dummyjson.com/data/products/26/3.jpg",
			"https://i.dummyjson.com/data/products/26/4.jpg",
			"https://i.dummyjson.com/data/products/26/5.jpg",
			"https://i.dummyjson.com/data/products/26/thumbnail.jpg"
		]
	},
	{
		id: 27,
		title: "Flying Wooden Bird",
		description: "Package Include 6 Birds with Adhesive Tape Shape: 3D Shaped Wooden Birds Material: Wooden MDF, Laminated 3.5mm",
		price: 51,
		discountPercentage: 15.58,
		rating: 4.41,
		stock: 17,
		brand: "Flying Wooden",
		category: "homedecoration",
		thumbnail: "https://i.dummyjson.com/data/products/27/thumbnail.webp",
		images: [
			"https://i.dummyjson.com/data/products/27/1.jpg",
			"https://i.dummyjson.com/data/products/27/2.jpg",
			"https://i.dummyjson.com/data/products/27/3.jpg",
			"https://i.dummyjson.com/data/products/27/4.jpg",
			"https://i.dummyjson.com/data/products/27/thumbnail.webp"
		]
	},
	{
		id: 28,
		title: "3D Embellishment Art Lamp",
		description: "3D led lamp sticker Wall sticker 3d wall art light on/off button  cell operated (included)",
		price: 20,
		discountPercentage: 16.49,
		rating: 4.82,
		stock: 54,
		brand: "LED Lights",
		category: "homedecoration",
		thumbnail: "https://i.dummyjson.com/data/products/28/thumbnail.jpg",
		images: [
			"https://i.dummyjson.com/data/products/28/1.jpg",
			"https://i.dummyjson.com/data/products/28/2.jpg",
			"https://i.dummyjson.com/data/products/28/3.png",
			"https://i.dummyjson.com/data/products/28/4.jpg",
			"https://i.dummyjson.com/data/products/28/thumbnail.jpg"
		]
	},
	{
		id: 29,
		title: "Handcraft Chinese style",
		description: "Handcraft Chinese style art luxury palace hotel villa mansion home decor ceramic vase with brass fruit plate",
		price: 60,
		discountPercentage: 15.34,
		rating: 4.44,
		stock: 7,
		brand: "luxury palace",
		category: "homedecoration",
		thumbnail: "https://i.dummyjson.com/data/products/29/thumbnail.webp",
		images: [
			"https://i.dummyjson.com/data/products/29/1.jpg",
			"https://i.dummyjson.com/data/products/29/2.jpg",
			"https://i.dummyjson.com/data/products/29/3.webp",
			"https://i.dummyjson.com/data/products/29/4.webp",
			"https://i.dummyjson.com/data/products/29/thumbnail.webp"
		]
	},
	{
		id: 30,
		title: "Key Holder",
		description: "Attractive DesignMetallic materialFour key hooksReliable & DurablePremium Quality",
		price: 30,
		discountPercentage: 2.92,
		rating: 4.92,
		stock: 54,
		brand: "Golden",
		category: "homedecoration",
		thumbnail: "https://i.dummyjson.com/data/products/30/thumbnail.jpg",
		images: [
			"https://i.dummyjson.com/data/products/30/1.jpg",
			"https://i.dummyjson.com/data/products/30/2.jpg",
			"https://i.dummyjson.com/data/products/30/3.jpg",
			"https://i.dummyjson.com/data/products/30/thumbnail.jpg"
		]
	}
];

const StarIcon = () => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className: "w-5",
      "xml:space": "preserve",
      viewBox: "0 0 47.94 47.94",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "m26.285 2.486 5.407 10.956a2.58 2.58 0 0 0 1.944 1.412l12.091 1.757c2.118.308 2.963 2.91 1.431 4.403l-8.749 8.528a2.582 2.582 0 0 0-.742 2.285l2.065 12.042c.362 2.109-1.852 3.717-3.746 2.722l-10.814-5.685a2.585 2.585 0 0 0-2.403 0l-10.814 5.685c-1.894.996-4.108-.613-3.746-2.722l2.065-12.042a2.582 2.582 0 0 0-.742-2.285L.783 21.014c-1.532-1.494-.687-4.096 1.431-4.403l12.091-1.757a2.58 2.58 0 0 0 1.944-1.412l5.407-10.956c.946-1.919 3.682-1.919 4.629 0z",
          style: { fill: "orange" }
        }
      )
    }
  );
};

function RatingStars({ rating }) {
  if (rating > 0 && rating <= 1.5) {
    return /* @__PURE__ */ jsx(StarIcon, {});
  } else if (rating > 1.5 && rating <= 2.5) {
    return /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
      /* @__PURE__ */ jsx(StarIcon, {}),
      /* @__PURE__ */ jsx(StarIcon, {})
    ] });
  } else if (rating > 2.5 && rating <= 3.5) {
    return /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
      /* @__PURE__ */ jsx(StarIcon, {}),
      /* @__PURE__ */ jsx(StarIcon, {}),
      /* @__PURE__ */ jsx(StarIcon, {})
    ] });
  } else if (rating > 3.5 && rating <= 4.5) {
    return /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
      /* @__PURE__ */ jsx(StarIcon, {}),
      /* @__PURE__ */ jsx(StarIcon, {}),
      /* @__PURE__ */ jsx(StarIcon, {}),
      /* @__PURE__ */ jsx(StarIcon, {})
    ] });
  } else {
    return /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
      /* @__PURE__ */ jsx(StarIcon, {}),
      /* @__PURE__ */ jsx(StarIcon, {}),
      /* @__PURE__ */ jsx(StarIcon, {}),
      /* @__PURE__ */ jsx(StarIcon, {}),
      /* @__PURE__ */ jsx(StarIcon, {})
    ] });
  }
}

const $$Astro = createAstro();
const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const productId = Number(id?.split(":")[1]);
  const product = products.filter((product2) => product2.id === productId);
  return renderTemplate`${renderComponent($$result, "StoreLayout", $$StoreLayout, { "title": `Bazar Universal - ${id}` }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<article> ${product.map(({ title, description, price, rating, images, brand, stock }) => renderTemplate`<section class="flex gap-10 items-center justify-center"> <img class="rounded-full w-64 h-64"${addAttribute(images[0], "src")}${addAttribute(title, "alt")} loading="lazy" decoding="async"> <div class="flex flex-col gap-2"> ${images.map((image) => renderTemplate`<img class="rounded-full w-14 h-14"${addAttribute(image, "src")}${addAttribute(title, "alt")} loading="lazy" decoding="async">`)} </div> </section>
                
                <section class="flex flex-col justify-center items-center mt-10 gap-5"> <h3 class="text-3xl font-bold">${title} - ${brand}</h3> <div class="flex gap-10"> <div class="flex flex-col items-center"> <span class="font-bold text-2xl">${price}$</span> <span class="font-bold">${stock} disponibles</span> </div> ${renderComponent($$result2, "RatingStars", RatingStars, { "rating": rating })} </div> <p class="text-pretty mt-4">${description}</p> <button class="mt-10 bg-blue-500 hover:bg-blue-700 text-white text-5xl font-bold py-2 px-4 border-b-4 border-blue-700 rounded-2xl transform transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 w-auto">
Comprar
</button> </section>`)} </article> ` })}`;
}, "C:/Users/pepeg/OneDrive - UNIVERSIDAD DE SEVILLA/Dev/Pruebas Tecnicas/pruebastecnicas.com/02-bazar-universal/src/pages/items/[id].astro", void 0);

const $$file = "C:/Users/pepeg/OneDrive - UNIVERSIDAD DE SEVILLA/Dev/Pruebas Tecnicas/pruebastecnicas.com/02-bazar-universal/src/pages/items/[id].astro";
const $$url = "/items/[id]";

const _id_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Footer as $, RatingStars as R, SearchForm as S, _id_ as _, $$Image as a, $$StoreLayout as b, getConfiguredImageService as g, imageConfig as i, products as p, truckImage as t };
