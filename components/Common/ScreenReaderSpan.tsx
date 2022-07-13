import { BaseReactProps } from "../../utils/api/types/common";

const ScreenReaderSpan: React.FC<BaseReactProps> = ({ children }) => (
  <span className="sr-only">{children}</span>
);

export default ScreenReaderSpan;