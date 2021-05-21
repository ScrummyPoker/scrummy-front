import React, { Fragment } from 'react';
import { isLoggedIn, logoutUser } from '../../../services/auth';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import clsx from 'clsx';
import IconButton from '../../IconButton';
import { UserIcon } from '@heroicons/react/solid';
import { ROUTE_AUTH_LOGIN, ROUTE_AUTH_REGISTER } from '../../../utils/routes';

const Navbar = props => {

  return (
    <div className="relative p-4 px-4 sm:px-6 lg:px-8 bg-gray-800">
      <nav className="relative flex items-center justify-between lg:justify-start">
        <div className="flex items-center flex-grow flex-shrink-0">
          <div className="flex items-center justify-between w-full md:w-auto">
            <a href="#">
              <span className="sr-only">Workflow</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              />
            </a>
          </div>
        </div>
        <div className="md:ml-10 md:pr-4 md:space-x-8">
          {isLoggedIn() ? (
            <Menu as="div" className="ml-3 relative">
              {({ open }) => (
                <>
                  <div>
                    <Menu.Button 
                      as={"div"} 
                      className={clsx(
                        "max-w-xs bg-gray-800 rounded-full flex items-center text-sm", 
                        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      )}>
                      <IconButton Icon={UserIcon} />
                    </Menu.Button>
                  </div>
                  <Transition
                    show={open}
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      static
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={logoutUser}
                            href="#"
                            className={clsx(
                              active && 'bg-gray-100',
                              'block px-4 py-2 text-sm text-gray-700',
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          ) : (
            <>
              <a href={ROUTE_AUTH_LOGIN} className="font-medium">
                Log in
              </a>
              <a href={ROUTE_AUTH_REGISTER} className="font-medium">
                Create Account
              </a>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
