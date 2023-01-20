import Button from "./Framework/Button";
import Input from "./Framework/Input";
import { Navbar } from "./Framework/Navbar/NavBar";

export function TestPage() {
  return (
    <>
      <Navbar childrens={""}/>
      <h1 className="text-3xl font-bold underline text-red-500">
        Hello world aaa!
      </h1>
      <Button>Button</Button>
      <Input name="NAME" label="Mouette" />
    </>
  );
}
