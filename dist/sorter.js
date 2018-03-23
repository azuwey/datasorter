"use strict";
/**
 * @author David Zarandi (Azuwey)
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Sorter = /** @class */ (function () {
    function Sorter(input) {
        this.input = input;
    }
    Object.defineProperty(Sorter.prototype, "sortedInput", {
        get: function () {
            var _input = this.input.map(function (tempInput) {
                tempInput.parentIDs.sort(function (current, next) {
                    if (current < next) {
                        return -1;
                    }
                    else if (current > next) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                });
                return tempInput;
            });
            var _sortedInput = [];
            _input.reverse().forEach(function (tempInput) {
                var parents = tempInput.parentIDs;
                var parentIndex = _sortedInput
                    .findIndex(function (value) { return parents[parents.length - 1] === value.id; });
                if (parentIndex != -1) {
                    _sortedInput.splice(parentIndex + 1, 0, tempInput);
                }
                else {
                    var refererIndex = _sortedInput
                        .findIndex(function (value) { return value.parentIDs.includes(tempInput.id); });
                    if (refererIndex != -1) {
                        _sortedInput.splice(refererIndex, 0, tempInput);
                    }
                    else {
                        _sortedInput.push(tempInput);
                    }
                }
            });
            return _sortedInput;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sorter.prototype, "calculatedTree", {
        get: function () {
            var _sortedInput = this.sortedInput;
            var _treeData = [];
            _sortedInput.forEach(function (input) {
                var vertical = 0;
                var horizontal = 0;
                if (input.parentIDs.length !== 0) {
                    var parents_1 = _treeData
                        .filter(function (parent) { return input.parentIDs.includes(parent.input.id); });
                    parents_1.sort(function (current, next) {
                        if (current.vertical < next.vertical) {
                            return -1;
                        }
                        else if (current > next) {
                            return 1;
                        }
                        else {
                            return 0;
                        }
                    });
                    vertical = parents_1[parents_1.length - 1].vertical + 1;
                    var childCompanions = _treeData
                        .filter(function (childCompanion) { return childCompanion.vertical === vertical; })
                        .filter(function (childCompanion) { return childCompanion.input.parentIDs
                        .includes(parents_1[parents_1.length - 1].input.id); });
                    (childCompanions.length > 0) &&
                        (horizontal = childCompanions[childCompanions.length - 1].horizontal + 1);
                }
                else {
                    var childCompanions = _treeData
                        .filter(function (childCompanion) { return childCompanion.vertical === vertical; });
                    (childCompanions.length > 0) &&
                        (horizontal = childCompanions[childCompanions.length - 1].horizontal + 1);
                }
                _treeData.push({ input: input, horizontal: horizontal, vertical: vertical });
            });
            return _treeData;
        },
        enumerable: true,
        configurable: true
    });
    return Sorter;
}());
exports.Sorter = Sorter;
//# sourceMappingURL=sorter.js.map