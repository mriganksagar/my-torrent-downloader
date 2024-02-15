import { Input } from "./shadui/ui/input";

export function TestPage() {
  return (<>
    <Input type="file" accept="" onChange={(e) => console.log(e.target.files)} />
  </>);
}