// export { default as sectionData } from '../../data/dataTable/section/sectionData.json';
import sections from "./sectionData.json";
const en: string[][] = beta.map((data) =>
  data.contents.map((content) => content.entity)
);

// export const sectionData = beta.map(data => data.contents.map(content => content))
// .reduce((arr, cur) => arr.concat(cur) ,[])

/** all the sections. d */
export const sections: string[] = en.reduce((arr, cur) => arr.concat(cur), []);

export const flattenSectionData = beta.flatMap(
  (sectionData) => sectionData.contents
);

export const entities = flattenSectionData.map(
  (sectionData) => sectionData.entity
);
export const sectionData = beta;
