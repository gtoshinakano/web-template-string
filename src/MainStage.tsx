import { Output } from "./Output"
import { SideMenu } from "./SideMenu"
import { TemplateInput } from "./TemplateInput"

export const MainStage = () => {

  return <section className="flex w-full h-full">
    <SideMenu />
    <TemplateInput />
    <Output />
  </section>
}