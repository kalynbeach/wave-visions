"use client"

import { VisionSelection, useVisions } from "@/app/visions-context"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"

export default function HeaderMenubar() {
  const [visionsState, setVisionsState] = useVisions()

  const handleVisionChange = (value: string) => {
    setVisionsState({ ...visionsState, selected: value as VisionSelection })
  }

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Info</MenubarTrigger>
        <MenubarContent>
          <MenubarItem inset>Audio {`->`} Processing {`->`} Visuals</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>🚧 work in progress 🚧</MenubarItem>
          <MenubarSeparator />
          <MenubarItem disabled inset>
            Made by @kalynbeach
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      {/* <MenubarMenu>
        <MenubarTrigger>Devices</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked>Microphone</MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu> */}
      <MenubarMenu>
        <MenubarTrigger>Visions</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value={visionsState.selected} onValueChange={handleVisionChange}>
            {Object.keys(VisionSelection).map((vision) => (
              <MenubarRadioItem key={vision} value={vision}>
                {vision}
              </MenubarRadioItem>
            ))}
            {/* <MenubarRadioItem value={VisionSelection.Boxes}>Boxes</MenubarRadioItem>
            <MenubarRadioItem value={VisionSelection.Sphere}>Sphere</MenubarRadioItem> */}
          </MenubarRadioGroup>
          {/* <MenubarSeparator /> */}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}