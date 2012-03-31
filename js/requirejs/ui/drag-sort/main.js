define([ './drag-sort' ], function(DragSort) {
	return {
		init : function(target) {
			return new DragSort(target);
		}
	};
});
