"use client"

import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';

import { toast } from "sonner";
import DrawerComponent from "./_drawer";
import DialogComponent from "./_dialog";

  
interface ActionsMenuProps {
  actions: string[];
  label: string;
  uuid: string;
  object: string;
}


export default function ActionsMenu({ actions, label, uuid, object }: ActionsMenuProps) {
    const [selectedAction, setSelectedAction] = useState<string | null>(null);
    const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
    const [selectedObject, setSelectedObject] = useState<string | null>(null);
    const [selectedUuid, setSelectedUuid] = useState<string | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSubmit = () => {
        alert ("SUBMIT")
    }

    const handleMenuClick = (action: string, label: string, uuid: string, object: string) => {
        setSelectedAction(action);
        setSelectedLabel(label);
        setSelectedObject(object);
        setSelectedUuid(uuid);
        if (action === 'share') {
          setIsDrawerOpen(true);
        } else if (action === 'hide') {
          setIsDialogOpen(true);
        } else if ( action === "favorite") {
          toast("Success", {
            description: "Your favorite has been added.",
          })
        }
    };

  return (
    <div className="relative inline-block text-left">
      <Menu>
        <Menu.Button className="flex items-center rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span className="sr-only">Open options</span>
          <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {actions.map((action, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <button
                      onClick={() => handleMenuClick(action, label, uuid, object)}
                      className={`${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } w-full text-left px-4 py-2 text-sm capitalize`}
                    >
                      {action}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

        <DrawerComponent
            isOpen={isDrawerOpen}
            handleSubmit={handleSubmit}
            setIsOpen={setIsDrawerOpen}
            action={selectedAction}
            label={selectedLabel}
            uuid={selectedUuid}
            object={selectedObject}
        />
        <DialogComponent
            isOpen={isDialogOpen}
            handleSubmit={handleSubmit}
            setIsOpen={setIsDialogOpen}
            action={selectedAction}
            uuid={selectedUuid}
            object={selectedObject}
            label={selectedLabel}
        />
    </div>
  );
}
