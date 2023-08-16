function refactorFormat(format) {
  return {
    width: format.width,
    height: format.height,
    url: format.url,
  }
}

function refactorFormats(formats) {
  for (let format in formats) {
    formats[format] = refactorFormat(formats[format]);
  }
}

function refactorImage(image) {
  const imageObject = image[0];
  const imageNew = {
    width: imageObject.width,
    height: imageObject.height,
    url: imageObject.url,
    formats: imageObject.formats,
  }

  refactorFormats(imageNew.formats);

  return imageNew;
}

function refactorResponse(response) {
  for (let key in response) {
    if (typeof response[key] == 'object') {
      refactorResponse(response[key]);
    }

    if (key == 'image' && Array.isArray(response[key])) {
      response[key] = refactorImage(response[key]);
    }
  }
}

async function respond(ctx, next) {
  await next();
  if (!ctx.url.startsWith('/api')) {
    return;
  }

  refactorResponse(ctx.response.body);
}

module.exports = () => respond;
