var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from 'angular2/src/core/di';
import { ViewMetadata } from '../metadata/view';
import { ComponentMetadata } from '../metadata/directives';
import { stringify, isBlank, isPresent } from 'angular2/src/facade/lang';
import { BaseException } from 'angular2/src/facade/exceptions';
import { Map } from 'angular2/src/facade/collection';
import { reflector } from 'angular2/src/core/reflection/reflection';
export let ViewResolver = class {
    constructor() {
        /** @internal */
        this._cache = new Map();
    }
    resolve(component) {
        var view = this._cache.get(component);
        if (isBlank(view)) {
            view = this._resolve(component);
            this._cache.set(component, view);
        }
        return view;
    }
    /** @internal */
    _resolve(component) {
        var compMeta;
        var viewMeta;
        reflector.annotations(component).forEach(m => {
            if (m instanceof ViewMetadata) {
                viewMeta = m;
            }
            if (m instanceof ComponentMetadata) {
                compMeta = m;
            }
        });
        if (isPresent(compMeta)) {
            if (isBlank(compMeta.template) && isBlank(compMeta.templateUrl) && isBlank(viewMeta)) {
                throw new BaseException(`Component '${stringify(component)}' must have either 'template', 'templateUrl', or '@View' set.`);
            }
            else if (isPresent(compMeta.template) && isPresent(viewMeta)) {
                this._throwMixingViewAndComponent("template", component);
            }
            else if (isPresent(compMeta.templateUrl) && isPresent(viewMeta)) {
                this._throwMixingViewAndComponent("templateUrl", component);
            }
            else if (isPresent(compMeta.directives) && isPresent(viewMeta)) {
                this._throwMixingViewAndComponent("directives", component);
            }
            else if (isPresent(compMeta.pipes) && isPresent(viewMeta)) {
                this._throwMixingViewAndComponent("pipes", component);
            }
            else if (isPresent(compMeta.encapsulation) && isPresent(viewMeta)) {
                this._throwMixingViewAndComponent("encapsulation", component);
            }
            else if (isPresent(compMeta.styles) && isPresent(viewMeta)) {
                this._throwMixingViewAndComponent("styles", component);
            }
            else if (isPresent(compMeta.styleUrls) && isPresent(viewMeta)) {
                this._throwMixingViewAndComponent("styleUrls", component);
            }
            else if (isPresent(viewMeta)) {
                return viewMeta;
            }
            else {
                return new ViewMetadata({
                    templateUrl: compMeta.templateUrl,
                    template: compMeta.template,
                    directives: compMeta.directives,
                    pipes: compMeta.pipes,
                    encapsulation: compMeta.encapsulation,
                    styles: compMeta.styles,
                    styleUrls: compMeta.styleUrls
                });
            }
        }
        else {
            if (isBlank(viewMeta)) {
                throw new BaseException(`No View decorator found on component '${stringify(component)}'`);
            }
            else {
                return viewMeta;
            }
        }
        return null;
    }
    /** @internal */
    _throwMixingViewAndComponent(propertyName, component) {
        throw new BaseException(`Component '${stringify(component)}' cannot have both '${propertyName}' and '@View' set at the same time"`);
    }
};
ViewResolver = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [])
], ViewResolver);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld19yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci92aWV3X3Jlc29sdmVyLnRzIl0sIm5hbWVzIjpbIlZpZXdSZXNvbHZlciIsIlZpZXdSZXNvbHZlci5jb25zdHJ1Y3RvciIsIlZpZXdSZXNvbHZlci5yZXNvbHZlIiwiVmlld1Jlc29sdmVyLl9yZXNvbHZlIiwiVmlld1Jlc29sdmVyLl90aHJvd01peGluZ1ZpZXdBbmRDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sc0JBQXNCO09BQ3hDLEVBQUMsWUFBWSxFQUFDLE1BQU0sa0JBQWtCO09BQ3RDLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx3QkFBd0I7T0FFakQsRUFBTyxTQUFTLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBQyxNQUFNLDBCQUEwQjtPQUNyRSxFQUFDLGFBQWEsRUFBQyxNQUFNLGdDQUFnQztPQUNyRCxFQUFDLEdBQUcsRUFBQyxNQUFNLGdDQUFnQztPQUUzQyxFQUFDLFNBQVMsRUFBQyxNQUFNLHlDQUF5QztBQUdqRTtJQUFBQTtRQUVFQyxnQkFBZ0JBO1FBQ2hCQSxXQUFNQSxHQUFHQSxJQUFJQSxHQUFHQSxFQUFzQkEsQ0FBQ0E7SUFrRnpDQSxDQUFDQTtJQWhGQ0QsT0FBT0EsQ0FBQ0EsU0FBZUE7UUFDckJFLElBQUlBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBO1FBRXRDQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNsQkEsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7WUFDaENBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLFNBQVNBLEVBQUVBLElB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QU9BLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUN0QkEsTUFBTUEsSUFBSUEsYUFBYUEsQ0FBQ0EseUNBQXlDQSxTQUFTQSxDQUFDQSxTQUFTQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUM1RkEsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ05BLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBO1lBQ2xCQSxDQUFDQTtRQUNIQSxDQUFDQTtRQUNEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtJQUNkQSxDQUFDQTtJQUVESCxnQkFBZ0JBO0lBQ2hCQSw0QkFBNEJBLENBQUNBLFlBQW9CQSxFQUFFQSxTQUFlQTtRQUNoRUksTUFBTUEsSUFBSUEsYUFBYUEsQ0FDbkJBLGNBQWNBLFNBQVNBLENBQUNBLFNBQVNBLENBQUNBLHVCQUF1QkEsWUFBWUEscUNBQXFDQSxDQUFDQSxDQUFDQTtJQUNsSEEsQ0FBQ0E7QUFDSEosQ0FBQ0E7QUFyRkQ7SUFBQyxVQUFVLEVBQUU7O2lCQXFGWjtBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge1ZpZXdNZXRhZGF0YX0gZnJvbSAnLi4vbWV0YWRhdGEvdmlldyc7XG5pbXBvcnQge0NvbXBvbmVudE1ldGFkYXRhfSBmcm9tICcuLi9tZXRhZGF0YS9kaXJlY3RpdmVzJztcblxuaW1wb3J0IHtUeXBlLCBzdHJpbmdpZnksIGlzQmxhbmssIGlzUHJlc2VudH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7TWFwfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuXG5pbXBvcnQge3JlZmxlY3Rvcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcmVmbGVjdGlvbi9yZWZsZWN0aW9uJztcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVmlld1Jlc29sdmVyIHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfY2FjaGUgPSBuZXcgTWFwPFR5cGUsIFZpZXdNZXRhZGF0YT4oKTtcblxuICByZXNvbHZlKGNvbXBvbmVudDogVHlwZSk6IFZpZXdNZXRhZGF0YSB7XG4gICAgdmFyIHZpZXcgPSB0aGlzLl9jYWNoZS5nZXQoY29tcG9uZW50KTtcblxuICAgIGlmIChpc0JsYW5rKHZpZXcpKSB7XG4gICAgICB2aWV3ID0gdGhpcy5fcmVzb2x2ZShjb21wb25lbnQpO1xuICAgICAgdGhpcy5fY2FjaGUuc2V0KGNvbXBvbmVudCwgdmlldyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZpZXc7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9yZXNvbHZlKGNvbXBvbmVudDogVHlwZSk6IFZpZXdNZXRhZGF0YSB7XG4gICAgdmFyIGNvbXBNZXRhOiBDb21wb25lbnRNZXRhZGF0YTtcbiAgICB2YXIgdmlld01ldGE6IFZpZXdNZXRhZGF0YTtcblxuICAgIHJlZmxlY3Rvci5hbm5vdGF0aW9ucyhjb21wb25lbnQpLmZvckVhY2gobSA9PiB7XG4gICAgICBpZiAobSBpbnN0YW5jZW9mIFZpZXdNZXRhZGF0YSkge1xuICAgICAgICB2aWV3TWV0YSA9IG07XG4gICAgICB9XG4gICAgICBpZiAobSBpbnN0YW5jZW9mIENvbXBvbmVudE1ldGFkYXRhKSB7XG4gICAgICAgIGNvbXBNZXRhID0gbTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChpc1ByZXNlbnQoY29tcE1ldGEpKSB7XG4gICAgICBpZiAoaXNCbGFuayhjb21wTWV0YS50ZW1wbGF0ZSkgJiYgaXNCbGFuayhjb21wTWV0YS50ZW1wbGF0ZVVybCkgJiYgaXNCbGFuayh2aWV3TWV0YSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgICAgICBgQ29tcG9uZW50ICcke3N0cmluZ2lmeShjb21wb25lbnQpfScgbXVzdCBoYXZlIGVpdGhlciAndGVtcGxhdGUnLCAndGVtcGxhdGVVcmwnLCBvciAnQFZpZXcnIHNldC5gKTtcblxuICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQoY29tcE1ldGEudGVtcGxhdGUpICYmIGlzUHJlc2VudCh2aWV3TWV0YSkpIHtcbiAgICAgICAgdGhpcy5fdGhyb3dNaXhpbmdWaWV3QW5kQ29tcG9uZW50KFwidGVtcGxhdGVcIiwgY29tcG9uZW50KTtcblxuICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQoY29tcE1ldGEudGVtcGxhdGVVcmwpICYmIGlzUHJlc2VudCh2aWV3TWV0YSkpIHtcbiAgICAgICAgdGhpcy5fdGhyb3dNaXhpbmdWaWV3QW5kQ29tcG9uZW50KFwidGVtcGxhdGVVcmxcIiwgY29tcG9uZW50KTtcblxuICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQoY29tcE1ldGEuZGlyZWN0aXZlcykgJiYgaXNQcmVzZW50KHZpZXdNZXRhKSkge1xuICAgICAgICB0aGlzLl90aHJvd01peGluZ1ZpZXdBbmRDb21wb25lbnQoXCJkaXJlY3RpdmVzXCIsIGNvbXBvbmVudCk7XG5cbiAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KGNvbXBNZXRhLnBpcGVzKSAmJiBpc1ByZXNlbnQodmlld01ldGEpKSB7XG4gICAgICAgIHRoaXMuX3Rocm93TWl4aW5nVmlld0FuZENvbXBvbmVudChcInBpcGVzXCIsIGNvbXBvbmVudCk7XG5cbiAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KGNvbXBNZXRhLmVuY2Fwc3VsYXRpb24pICYmIGlzUHJlc2VudCh2aWV3TWV0YSkpIHtcbiAgICAgICAgdGhpcy5fdGhyb3dNaXhpbmdWaWV3QW5kQ29tcG9uZW50KFwiZW5jYXBzdWxhdGlvblwiLCBjb21wb25lbnQpO1xuXG4gICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudChjb21wTWV0YS5zdHlsZXMpICYmIGlzUHJlc2VudCh2aWV3TWV0YSkpIHtcbiAgICAgICAgdGhpcy5fdGhyb3dNaXhpbmdWaWV3QW5kQ29tcG9uZW50KFwic3R5bGVzXCIsIGNvbXBvbmVudCk7XG5cbiAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KGNvbXBNZXRhLnN0eWxlVXJscykgJiYgaXNQcmVzZW50KHZpZXdNZXRhKSkge1xuICAgICAgICB0aGlzLl90aHJvd01peGluZ1ZpZXdBbmRDb21wb25lbnQoXCJzdHlsZVVybHNcIiwgY29tcG9uZW50KTtcblxuICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQodmlld01ldGEpKSB7XG4gICAgICAgIHJldHVybiB2aWV3TWV0YTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWaWV3TWV0YWRhdGEoe1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiBjb21wTWV0YS50ZW1wbGF0ZVVybCxcbiAgICAgICAgICB0ZW1wbGF0ZTogY29tcE1ldGEudGVtcGxhdGUsXG4gICAgICAgICAgZGlyZWN0aXZlczogY29tcE1ldGEuZGlyZWN0aXZlcyxcbiAgICAgICAgICBwaXBlczogY29tcE1ldGEucGlwZXMsXG4gICAgICAgICAgZW5jYXBzdWxhdGlvbjogY29tcE1ldGEuZW5jYXBzdWxhdGlvbixcbiAgICAgICAgICBzdHlsZXM6IGNvbXBNZXRhLnN0eWxlcyxcbiAgICAgICAgICBzdHlsZVVybHM6IGNvbXBNZXRhLnN0eWxlVXJsc1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGlzQmxhbmsodmlld01ldGEpKSB7XG4gICAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBObyBWaWV3IGRlY29yYXRvciBmb3VuZCBvbiBjb21wb25lbnQgJyR7c3RyaW5naWZ5KGNvbXBvbmVudCl9J2ApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZpZXdNZXRhO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3Rocm93TWl4aW5nVmlld0FuZENvbXBvbmVudChwcm9wZXJ0eU5hbWU6IHN0cmluZywgY29tcG9uZW50OiBUeXBlKTogdm9pZCB7XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXG4gICAgICAgIGBDb21wb25lbnQgJyR7c3RyaW5naWZ5KGNvbXBvbmVudCl9JyBjYW5ub3QgaGF2ZSBib3RoICcke3Byb3BlcnR5TmFtZX0nIGFuZCAnQFZpZXcnIHNldCBhdCB0aGUgc2FtZSB0aW1lXCJgKTtcbiAgfVxufVxuIl19