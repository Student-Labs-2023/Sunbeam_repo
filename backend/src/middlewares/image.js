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

function refactorImage(image, imageSize = null) {
  const format = image.formats[imageSize];
  if (imageSize) {
    return {
      width: format.width,
      height: format.height,
      url: format.url,
    };
  }

  const imageNew = {
    width: image.width,
    height: image.height,
    url: image.url,
    formats: image.formats,
  };

  refactorFormats(imageNew.formats, imageSize);

  return imageNew;
}

function refactorResponse(data, imageSize = null) {
  for (let key in data) {
    if (/image.*/.test(data[key]?.mime) && 'formats' in data[key]) {
      data[key] = refactorImage(data[key], imageSize);
    }

    else if (typeof data[key] == 'object')
      refactorResponse(data[key], imageSize);
  }
}

async function respond(ctx, next) {
  await next();
  if (!ctx.url.startsWith('/api')) {
    return;
  }

  const params = new URLSearchParams(ctx.request.url.split('?')[1])

  refactorResponse(ctx.response.body, params.get('imageSize'));
}

module.exports = () => respond;
