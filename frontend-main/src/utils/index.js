/**
 *
 * @param {HTMLFormElement} formTarget
 * @returns
 */
export function getFormEntries(formTarget) {
   const formData = new FormData(formTarget);
   const formEntries = Object.fromEntries(formData.entries());

   return formEntries;
}

export async function getBase64Image(element) {
   return new Promise(resolve => {
      const reader = new FileReader();

      reader.onloadend = () => {
         resolve(reader.result);
      };

      reader.readAsDataURL(element);
   });
}

/**
 * @param {string[]} args
 */
export function createSlug(...args) {
   args.push(Date.now());

   let slug = args.join('-');
   slug = slug.replaceAll(' ', '-');
   slug = slug.toLowerCase();

   return slug;
}

/**
 * @param {URLSearchParams} searchParams
 * @returns {{[key: string]: string}}
 */
export function getSearchQueries(searchParams) {
   let params = {};

   for (const [key, value] of searchParams.entries()) {
      params = {
         ...params,
         [key]: value,
      };
   }

   return params;
}
