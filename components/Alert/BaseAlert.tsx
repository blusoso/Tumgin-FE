import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BaseModal, { ALIGN_ITEM } from "../Modal/BaseModal/BaseModal";

type BaseAlertProps = {
  iconStart?: React.ReactNode;
  message: string;
};

const BaseAlert = ({ iconStart, message }: BaseAlertProps) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ zIndex: 999 }}
      >
        <BaseModal
          className="w-full"
          isOverlay={false}
          isOpen={true}
          hasClose={false}
          onPrimaryClick={() => console.log("xx")}
          width="93%"
          alignItem={ALIGN_ITEM.TOP}
          top="1.5%"
          right="0"
        >
          <div className="text-green flex items-center gap-2">
            {iconStart && iconStart}
            {message}
          </div>
        </BaseModal>
      </motion.div>
    </>
  );
};

export default BaseAlert;
