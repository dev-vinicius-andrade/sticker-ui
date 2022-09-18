const color_schemes = {
  colors : [
    'green',
    'purple',
    'indigo',
    'cyan',
    'teal',
    'orange',
    'pink',
    'red',
    'deep-purple',
    'blue',
    'light-blue',
    'light-green',
    'lime',
    'yellow',
    'amber',
    'deep-orange',
    'brow',
    'blue-grey',
    'grey'
  ],
  variations:[
    'lighten-1',
    'lighten-2',
    'lighten-3',
    'lighten-4',
    'lighten-5',
    'darken-1',
    'darken-2',
    'darken-3',
    'darken-4',
    'accent-1',
    'accent-2',
    'accent-3',
    'accent-4'
  ]
}


function randomColorAndVariationFromColorsSchemes() {
  const randomColorIndex = random(0, color_schemes.colors.length - 1);
  const color = color_schemes.colors[randomColorIndex];
  const randomVariationIndex = random(-1, color_schemes.variations.length - 1);
  if(randomVariationIndex===-1)
    return color;
  const variation = color_schemes.variations[randomVariationIndex];
  const colorWithVariation = `${color} ${variation}`;
  return colorWithVariation
}

function empty(data) {
  if (typeof data === 'undefined') {
    return true;
  } else if (data === '0') {
    return true;
  } else if (!data) {
    return true;
  } else if (/\S/.test(data) == '') {
    return true;
  } else {
    return false;
  }
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function random(min, max) {
  const minAsInt = Math.ceil(min);
  const maxAsInt = Math.floor(max);

  return Math.floor(Math.random() * (maxAsInt - minAsInt) + minAsInt);
}

function traverse(items) {
  // check if the node is an object or array
  if (items !== null && typeof items === "object") {
    Object.entries(items).forEach(([key, value]) => {
      // check if the item/node has a 'parent' property
      if (key === "parent") {
        items.children = value;
      }
      this.traverse(value);
    });
  }
}
function contains(array, value, ignoreCase=true,any=true){
  return array.findIndex(item=> {
    if( typeof item === 'string' && typeof value === 'string')
        return ignoreCase ? item.toLowerCase() === value.toLowerCase() : item === value;
    if(Array.isArray(value))
      if(any)
        return contains(value,item,ignoreCase,any);
      else
        return array.every(v=>contains(value,v,ignoreCase,any));
    return false;
  })>=0;
}

function clone(item) {
  const result = Object.assign({}, item);
  return result;
}

const plugin = function (vue, store) {
  return {
    color_schemes:color_schemes,
    colors: color_schemes.colors,
    colors_variations: color_schemes.variations,
    contains:contains,
    clone: clone,
    empty: empty,
    traverse: traverse,
    random: random,
    randomColorAndVariationFromColorsSchemes: randomColorAndVariationFromColorsSchemes,
    capitalizeFirstLetter:capitalizeFirstLetter,
    copyToClipboard(value) {
      navigator.clipboard.writeText(value)
      vue?.$notifications?.notifyInfo(`Value ${value} was copied to clipboard.`)
    }
  };
};
export default {
  install(Vue, {store}) {
    Vue.prototype.$utils = plugin(Vue, store);
  },
};
