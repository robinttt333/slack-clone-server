import _ from "lodash";

const formatErrors = (e) => {
	const errors = e.errors.map((x) => _.pick(x, ["path", "message"]));
	return errors.length
		? errors
		: [{ path: "name", message: "Something went wrong" }];
};
export default formatErrors;
