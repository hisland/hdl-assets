;;设置emacs的home目录为相对目录: emacs_dir/hisland
(setenv "HOME" (concat (getenv "emacs_dir") "/hisland"))

;;默认字体monaco
;;(set-default-font "Monaco")
(set-default-font "-*-Monaco-*-*-*-14-97-*-*-*-*-")

;;选择主题
;;(add-to-list 'load-path "~/color-theme-6.6.0")
;;(load-file "~/color-theme-6.6.0/themes/color-theme-arjen.el")
;;(color-theme-arjen)

;;加载el-get扩展
;;(add-to-list 'load-path "~/.emacs.d/el-get/el-get")
;;(require 'el-get)