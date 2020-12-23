import axios from "axios";

export const get_shemantic_paper = async (paper_id) => {
  // console.log(paper_id);
  const b_url = "https://api.semanticscholar.org/v1/paper/";
  const final_url = b_url + paper_id;
  const { data } = await axios.get(final_url);
  return data;
};
export const process_shemantic_data = (data, tresh_hold) => {
  const { citations, references } = data;
  // nodes creation
  const nodes_cit = citations
    .filter((cit, index) => index <= tresh_hold)
    .map((cit) => {
      return { id: cit["paperId"], group: 2 };
    });
  const nodes_ref = references
    .filter((ref, index) => index <= tresh_hold)
    .map((ref) => {
      return { id: ref["paperId"], group: 1 };
    });
  const nodes = nodes_cit.concat(nodes_ref);

  // return
  return nodes;
};
