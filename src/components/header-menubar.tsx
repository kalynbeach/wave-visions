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
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Devices</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked>Microphone</MenubarCheckboxItem>
          {/* <MenubarCheckboxItem checked>
            Always Show Full URLs
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem inset>
            Reload <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled inset>
            Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Toggle Fullscreen</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Hide Sidebar</MenubarItem> */}
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Visions</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value="boxes">
            <MenubarRadioItem value="boxes">Boxes</MenubarRadioItem>
            <MenubarRadioItem value="spheres">Spheres</MenubarRadioItem>
          </MenubarRadioGroup>
          {/* <MenubarSeparator />
          <MenubarItem inset>Edit...</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Add Profile...</MenubarItem> */}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}