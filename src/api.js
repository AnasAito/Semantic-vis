import axios from "axios";

export const get_shemantic_paper = async (paper_id) => {
  // console.log(paper_id);
  const b_url = "https://api.semanticscholar.org/v1/paper/";
  const final_url = b_url + paper_id;
  const { data } = await axios.get(final_url);
  return data;
};
const get_shemantic_paper_infl = async (paper_id) => {
  // console.log(paper_id);
  const b_url = "https://api.semanticscholar.org/v1/paper/";
  const final_url = b_url + paper_id;
  const { data } = await axios.get(final_url);
  return data["influentialCitationCount"];
};
export const process_shemantic_data = (data, tresh_hold) => {
  const { citations, references } = data;
  // nodes creation
  const nodes_cit = citations
    .filter((cit, index) => cit["isInfluential"])
    .filter((cit, index) => index <= tresh_hold)
    .map((cit) => {
      return {
        id: cit["paperId"],
        title: cit["title"],
        year: cit["year"],
        group: "cit",
      };
    });
  const nodes_ref = references
    .filter((ref, index) => ref["isInfluential"])
    .filter((ref, index) => index <= tresh_hold)
    .map((ref) => {
      return {
        id: ref["paperId"],
        title: ref["title"],
        year: ref["year"],
        group: "ref",
      };
    });
  const nodes = nodes_cit.concat(nodes_ref);
  {
    /*const nodes_infl = await Promise.all(
    nodes.map(async (node) => {
      const infl = await get_shemantic_paper_infl(node.id);
      return { ...node, ...{ infl: infl } };
    })
  );*/
  }
  // return
  return nodes;
};
