# Fiber

React Fiber 是 React 16 引入的新架构，是对 React 核心算法的重新实现。它的设计目的是解决 React 在处理大型应用时的性能问题，并为实现新的功能和特性提供基础。Fiber 通过引入分片、优先级调度和异步渲染等机制，使得 React 能够更高效地更新和渲染 UI。



## Fiber 的主要特性

1. **增量渲染（Incremental Rendering）**：
   - Fiber 允许将渲染工作分割成多个小任务，每个任务称为一个 "fiber"。这样可以在处理高优先级任务时暂停低优先级任务，提高 UI 的响应性。
2. **优先级调度（Priority Scheduling）**：
   - 每个更新都有不同的优先级，React Fiber 能够根据优先级调度任务。高优先级的任务（如用户输入）会被优先处理，而低优先级的任务（如后台数据加载）可以延后。
3. **并发模式（Concurrent Mode）**：
   - 并发模式允许 React 同时处理多个更新任务，而不会阻塞主线程。这样可以保持 UI 的流畅和响应性，特别是在处理复杂和耗时的更新时。
4. **错误边界（Error Boundaries）**：
   - Fiber 使得 React 可以在组件树的某个部分捕获并处理错误，而不会影响整个应用的运行。这提高了应用的健壮性和稳定性。

## Fiber 架构的工作原理

React Fiber 的架构由两个主要阶段组成：协调（Reconciliation）和提交（Commit）。

1. **协调阶段（Reconciliation Phase）**：
   - 在这个阶段，React 会遍历组件树，找出需要更新的部分。这个过程是增量的，可以在多个帧中分批完成，以确保高优先级任务得到及时响应。
2. **提交阶段（Commit Phase）**：
   - 一旦协调阶段确定了需要更新的部分，提交阶段会将这些更新应用到实际的 DOM 中。这个阶段必须是同步的，以确保 DOM 状态的一致性。

## 具体实现

- **Fiber 节点（Fiber Nodes）**：每个组件实例都会对应一个 Fiber 节点。Fiber 节点包含了组件的类型、状态、props、DOM 引用等信息。
- **工作单元（Work Units）**：每个 Fiber 节点代表一个工作单元，这些工作单元可以在多个帧中进行处理。
- **任务队列（Task Queue）**：Fiber 会将任务按优先级放入任务队列，根据主线程的空闲时间逐步执行这些任务。

## Fiber 的优点

- **流畅的用户体验**：通过分片和优先级调度，React Fiber 能够确保高优先级任务得到及时响应，从而提供流畅的用户体验。
- **更好的错误处理**：错误边界使得 React 能够在局部捕获错误，提高应用的健壮性。
- **灵活性和可扩展性**：Fiber 架构为未来的性能优化和新特性提供了基础。

## 总结

React Fiber 是 React 16 引入的新架构，通过增量渲染、优先级调度和并发模式，使得 React 能够更高效地更新和渲染 UI，提供流畅的用户体验。Fiber 的引入使得 React 更加灵活和可扩展，为未来的性能优化和新特性提供了坚实的基础。