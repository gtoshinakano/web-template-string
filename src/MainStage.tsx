import { Output } from "./Output"
import { SideMenu } from "./SideMenu"
import { TemplateInput } from "./TemplateInput"

export const MainStage = () => {

  return <section className="flex w-full grow">
    <SideMenu />
    <TemplateInput />
    <Output />
  </section>
}