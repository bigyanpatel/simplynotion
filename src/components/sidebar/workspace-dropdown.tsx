"use client";
import { useAppState } from "@/lib/providers/state-provider";
import { workspace } from "@/lib/supabase/supabase.types";
import React, { useEffect, useState } from "react";
import SelectedWorkspace from "./selected-workspace";

interface WorkspaceDropdownProps {
  privateWorkspaces: workspace[] | [];
  sharedWorkspaces: workspace[] | [];
  collaboratingWorkspaces: workspace[] | [];
  defaultValue: workspace | undefined;
}

const WorkspaceDropdown: React.FC<WorkspaceDropdownProps> = ({
  privateWorkspaces,
  collaboratingWorkspaces,
  sharedWorkspaces,
  defaultValue,
}) => {
  const { dispatch, state } = useAppState();
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!state.workspaces.length) {
      dispatch({
        type: "SET_WORKSPACES",
        payload: {
          workspaces: [
            ...privateWorkspaces,
            ...sharedWorkspaces,
            ...collaboratingWorkspaces,
          ].map((workspace) => ({ ...workspace, folders: [] })),
        },
      });
    }
  }, [privateWorkspaces, collaboratingWorkspaces, sharedWorkspaces]);

  const handleSelect = (option: workspace) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const findSelectedWorkspace = state.workspaces.find(
      (workspace) => workspace.id === defaultValue?.id
    );
    if (findSelectedWorkspace) setSelectedOption(findSelectedWorkspace);
  }, [state, defaultValue]);

  return (
    <div
      className=" relative inline-block
      text-left
  "
    >
      <div>
        <span onClick={() => setIsOpen(!isOpen)}>
          {selectedOption ? (
            <SelectedWorkspace workspace={selectedOption} />
          ) : (
            "Select a workspace"
          )}
        </span>
        {isOpen && (
          <div
            className="origin-top-right
          absolute
          w-full
          rounded-md
          shadow-md
          z-50
          h-[190px]
          bg-black/10
          backdrop-blur-lg
          group
          overflow-scroll
          border-[1px]
          border-muted
      "
          >
            <div className="rounded-md flex flex-col">
              <div className="!p-2">
                {!!privateWorkspaces.length && (
                  <>
                    <p className="text-muted-foreground">Private</p>
                    <hr></hr>
                    {privateWorkspaces.map((option) => (
                      <SelectedWorkspace
                        key={option.id}
                        workspace={option}
                        onClick={handleSelect}
                      />
                    ))}
                  </>
                )}
                {!!sharedWorkspaces.length && (
                  <>
                    <p className="text-muted-foreground">Shared</p>
                    <hr />
                    {sharedWorkspaces.map((option) => (
                      <SelectedWorkspace
                        key={option.id}
                        workspace={option}
                        onClick={handleSelect}
                      />
                    ))}
                  </>
                )}
                {!!collaboratingWorkspaces.length && (
                  <>
                    <p className="text-muted-foreground">Collaborating</p>
                    <hr />
                    {collaboratingWorkspaces.map((option) => (
                      <SelectedWorkspace
                        key={option.id}
                        workspace={option}
                        onClick={handleSelect}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkspaceDropdown;
